import { IBuildRepository } from "../../Application/Repositories/IBuildRepository";
import Build from "../../Domain/Entities/Build";
import { IBuildApi } from "../api/Interfaces/IBuildApi";
import { BuildMapper } from "../Mappers/BuildMappers";

export class BuildRepository implements IBuildRepository {

    buildApi: IBuildApi;

    constructor(buildApi: IBuildApi) {
        this.buildApi = buildApi;
    }

    async getBuild(buildId: string): Promise<Build> {
        let result = await this.buildApi.getBuild(buildId);
        return result?.data ?? new Build('', '', '', [], new Date(), '');

    }

    async updateBuild(build: Build): Promise<boolean> {
        build.updatedAt = null;
        build.updatedBy = null;
        let result = await this.buildApi.updateBuild(build);
        return result?.success ?? false;
    }

    async deleteBuild(buildId: string): Promise<boolean> {
        let result = await this.buildApi.deleteBuild(buildId);
        return result?.success ?? false;
    }
    
    async listBuilds(): Promise<Build[]> {
        let result = await this.buildApi.listBuilds();

        return BuildMapper.ToDomainList(result?.data ?? []);
    }

    async createBuild(build: Build): Promise<boolean> {

        let result = await this.buildApi.createBuild(build);
        return result?.success ?? false;

    }
}