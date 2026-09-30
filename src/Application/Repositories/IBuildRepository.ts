import Build from "../../Domain/Entities/Build";

export interface IBuildRepository {
    createBuild(build: Build): Promise<boolean>;
    getBuild(buildId: string): Promise<Build>;
    updateBuild(build: Build): Promise<boolean>;
    deleteBuild(buildId: string): Promise<boolean>;
    listBuilds(): Promise<Build[]>;
}