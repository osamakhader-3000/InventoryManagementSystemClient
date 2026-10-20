import { IBuildRepository } from './domain/IBuildRepository';
import { IClientRepository } from './domain/IClientRepository';
import { HttpBuildRepository } from './infrastructure/HttpBuildRepository';
import { HttpClientRepository } from './infrastructure/HttpClientRepository';

export interface DeploymentRegistryDependencies {
    buildRepository: IBuildRepository;
    clientRepository: IClientRepository;
}

export function createDeploymentRegistryDependencies(): DeploymentRegistryDependencies {
    return {
        buildRepository: new HttpBuildRepository(),
        clientRepository: new HttpClientRepository(),
    };
}
