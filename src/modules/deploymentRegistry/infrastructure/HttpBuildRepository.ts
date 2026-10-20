import { IBuildRepository } from "../domain/IBuildRepository";
import Build from "../domain/Build";
import BuildApi, { BuildDto } from "./BuildApi";

export class HttpBuildRepository implements IBuildRepository {
    private buildApi: BuildApi;

    constructor() {
        this.buildApi = new BuildApi();
    }

    async ListBuilds(version?: string): Promise<Build[]> {
        const result = await this.buildApi.ListBuilds(version);

        if (!Array.isArray(result.data))
            return [];
        return result.data.map(HttpBuildRepository.ToDomain);
    }

    async CreateBuild(build: Build): Promise<boolean> {
        const result = await this.buildApi.CreateBuild(build);
        return result.success;
    }

    async UpdateBuild(build: Build): Promise<boolean> {
        const result = await this.buildApi.UpdateBuild(build);
        return result.success;
    }

    async DeleteBuild(buildId: string): Promise<boolean> {
        const result = await this.buildApi.DeleteBuild(buildId);
        return result.success;
    }

    async GetBuild(buildId: string): Promise<Build|null> {
        const result = await this.buildApi.GetBuild(buildId);
        return result.data ? HttpBuildRepository.ToDomain(result.data) : null;
    }

    private static ToDomain(dto: BuildDto): Build {
        return new Build(
            dto.id,
            dto.version,
            dto.link ?? null,
            (dto.clients ?? []).map(c => ({ id: c.id, name: c.name ?? "" }))
        );
    }
}
