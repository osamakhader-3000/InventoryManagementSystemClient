import Build from "../../../Domain/Entities/Build";
import { IBuildApi } from "../Interfaces/IBuildApi";
import { GeneralApi } from "../../../shared/infrastructure/http/GeneralApi";
import urls from '../../../shared/infrastructure/http/urls.json';
import { GeneralApiResult } from "../../../shared/infrastructure/DataTransferObjects/GeneralApiResult";

export class BuildApi extends GeneralApi implements IBuildApi {

    private baseUrl: string;

    constructor() {
        super();
        this.baseUrl = urls['inventory-management-system-app'];
    }
    async getBuild(buildId: string): Promise<GeneralApiResult<Build>> {
        let url = `${this.baseUrl}/${urls['build-get']}/${buildId}`;
        let result = await this.SecureApiCaller<Build>('GET', url);
        return result;
    }
    async updateBuild(build: Build): Promise<GeneralApiResult<boolean>> {
        let url = `${this.baseUrl}/${urls['build-update']}`;
        let result = await this.SecureApiCaller<boolean>('PUT', url, build);
        return result;
    }
    async deleteBuild(buildId: string): Promise<GeneralApiResult<boolean>> {
        let url = `${this.baseUrl}/${urls['build-delete']}/${buildId}`;
        let result = await this.SecureApiCaller<boolean>('DELETE', url);
        return result;
    }
    async listBuilds(): Promise<GeneralApiResult<Build[]>> {
        let url = `${this.baseUrl}/${urls['build-list']}`;
        let result = await this.SecureApiCaller<Build[]>('GET', url);
        return result;
    }

    async createBuild(build: Build): Promise<GeneralApiResult<boolean>> {
        let url = `${this.baseUrl}/${urls['build-create']}`;
        let result = await this.SecureApiCaller<boolean>('POST', url, build);
        return result;
    }
}