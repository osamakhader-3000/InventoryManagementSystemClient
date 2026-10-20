import Build from './Build';

export interface IBuildRepository {
    ListBuilds(version?: string): Promise<Build[]>;
    CreateBuild(build: Build): Promise<boolean>;
    UpdateBuild(build: Build): Promise<boolean>;
    DeleteBuild(buildId: string): Promise<boolean>;
    GetBuild(buildId: string): Promise<Build|null>;
}
