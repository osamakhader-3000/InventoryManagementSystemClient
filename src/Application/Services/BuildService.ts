import Build from "../../Domain/Entities/Build";
import { IBuildService } from "../Interfaces/IBuildService";
import { IBuildRepository } from "../Repositories/IBuildRepository";
import { IUserRepository } from "../Repositories/IUserRepository";

export class BuildService implements IBuildService {

    buildRepository: IBuildRepository;
    usersRepository: IUserRepository;

    constructor(buildRepository: IBuildRepository, usersRepository: IUserRepository) {
        this.buildRepository = buildRepository;
        this.usersRepository = usersRepository;
    }

    async getBuild(buildId: string): Promise<Build> {
        let build = await this.buildRepository.getBuild(buildId);
        return build;
    }

    updateBuild(build: Build): Promise<boolean> {
        return this.buildRepository.updateBuild(build);
    }

    deleteBuild(buildId: string): Promise<boolean> {
        return this.buildRepository.deleteBuild(buildId);
    }

    async listBuilds(): Promise<Build[]> {
        let builds = await this.buildRepository.listBuilds();
        return builds;
    }

    createBuild(build: Build): Promise<boolean> {
        return this.buildRepository.createBuild(build);
    }
}