import Build from "../../../Domain/Entities/Build";
import { GeneralApiResult } from "../../../shared/infrastructure/DataTransferObjects/GeneralApiResult";

export interface IBuildApi {
    createBuild(build: Build): Promise<GeneralApiResult<boolean>>;
    getBuild(buildId: string): Promise<GeneralApiResult<Build>>;
    updateBuild(build: Build): Promise<GeneralApiResult<boolean>>;
    deleteBuild(buildId: string): Promise<GeneralApiResult<boolean>>;
    listBuilds(): Promise<GeneralApiResult<Build[]>>;
}