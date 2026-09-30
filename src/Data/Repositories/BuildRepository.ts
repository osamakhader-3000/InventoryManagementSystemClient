import { IBuildRepository } from "../../Application/Repositories/IBuildRepository";
import Build from "../../Domain/Entities/Build";
import { IBuildApi } from "../api/Interfaces/IBuildApi";
import { IAuthService } from "../Commons/IAuthService";
import { GeneralApiResult } from "../../shared/infrastructure/DataTransferObjects/GeneralApiResult";
import { BuildMapper } from "../Mappers/BuildMappers";

export class BuildRepository implements IBuildRepository {

    buildApi: IBuildApi;
    authService: IAuthService;

    constructor(buildApi: IBuildApi, authService: IAuthService) {
        this.buildApi = buildApi;
        this.authService = authService;
    }

    async getBuild(buildId: string): Promise<Build> {
        let result = await this.authService.ProtectedAccess<Promise<GeneralApiResult<Build>>>(async () => {
            return this.buildApi.getBuild(buildId);
        });
        return result?.data ?? new Build('', '', '', [], new Date(), '');

    }

    async updateBuild(build: Build): Promise<boolean> {
        let result = await this.authService.ProtectedAccess<Promise<GeneralApiResult<boolean>>>(async () => {
            build.updatedAt = null;
            build.updatedBy = null;
            return this.buildApi.updateBuild(build);
        });
        return result?.success ?? false;
    }

    async deleteBuild(buildId: string): Promise<boolean> {
        let result = await this.authService.ProtectedAccess<Promise<GeneralApiResult<boolean>>>(async () => {
            return this.buildApi.deleteBuild(buildId);
        });
        return result?.success ?? false;
    }
    
    async listBuilds(): Promise<Build[]> {
        let result = await this.authService.ProtectedAccess<Promise<GeneralApiResult<Build[]>>>(async () => {
            return this.buildApi.listBuilds();
        });

        return BuildMapper.ToDomainList(result?.data ?? []);
    }

    async createBuild(build: Build): Promise<boolean> {

        let result = await this.authService.ProtectedAccess<Promise<GeneralApiResult<boolean>>>(async () => {
            return this.buildApi.createBuild(build);
        });
        return result?.success ?? false;

    }
}