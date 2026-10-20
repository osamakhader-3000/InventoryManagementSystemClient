import Build from '../domain/Build';
import urls from '../../../shared/infrastructure/http/urls.json'
import { GeneralApi } from "../../../shared/infrastructure/http/GeneralApi";
import { GeneralApiResult } from "../../../shared/infrastructure/DataTransferObjects/GeneralApiResult";

export interface BuildDto {
    id: string | null;
    version: string;
    link: string | null;
    clients: { id: string; name?: string | null }[] | null;
}

export default class BuildApi extends GeneralApi {
    private baseUrl:string;

    constructor(){
        super();
        this.baseUrl = `${urls['inventory-management-system-app']}${urls['deployment-registry-domain']}${urls['build']}`;
    }

    async ListBuilds(version?: string): Promise<GeneralApiResult<BuildDto[]>> {
        let url = `${this.baseUrl}${urls['build-list']}`;
        if (version)
            url += `?version=${encodeURIComponent(version)}`;
        return await this.SecureApiCaller<BuildDto[]>('GET', url);
    }

    async CreateBuild(build: Build): Promise<GeneralApiResult<boolean>> {
        const url = `${this.baseUrl}${urls['build-create']}`;
        return await this.SecureApiCaller<boolean>('POST', url, BuildApi.ToDto(build));
    }

    async UpdateBuild(build: Build): Promise<GeneralApiResult<boolean>> {
        const url = `${this.baseUrl}${urls['build-update']}`;
        return await this.SecureApiCaller<boolean>('PUT', url, BuildApi.ToDto(build));
    }

    async DeleteBuild(buildId: string): Promise<GeneralApiResult<boolean>> {
        const url = `${this.baseUrl}${urls['build-delete']}/${buildId}`;
        return await this.SecureApiCaller<boolean>('DELETE', url);
    }

    async GetBuild(buildId: string): Promise<GeneralApiResult<BuildDto>> {
        const url = `${this.baseUrl}${urls['build-get']}/${buildId}`;
        return await this.SecureApiCaller<BuildDto>('GET', url);
    }

    private static ToDto(build: Build): BuildDto {
        return {
            id: build.id,
            version: build.version,
            link: build.link,
            clients: build.clients.map(c => ({ id: c.id })),
        };
    }
}
