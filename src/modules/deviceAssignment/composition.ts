import { IAssignmentRepository } from './domain/IAssignmentRepository';
import IAccessoryRepository from './domain/IAccessoryRepository';
import { IDepartmentRepository } from './domain/IDepartmentRepository';
import { ILocationRepository } from './domain/ILocationRepository';
import { IOperatingSystemRepository } from './domain/IOperatingSystemRepository';
import { IDeviceRepository } from './domain/IDeviceRepository';
import { IUserRepository } from './domain/IUserRepository';
import { ITrialLogRepository } from './domain/ITrialLogRepository';
import { HttpAssignmentRepository } from './infrastructure/HttpAssignmentRepository';
import { HttpAccessoryRepository } from './infrastructure/HttpAccessoryRepository';
import { HttpDepartmentRepository } from './infrastructure/HttpDepartmentRepository';
import { HttpLocationRepository } from './infrastructure/HttpLocationRepository';
import { HttpOperatingSystemRepository } from './infrastructure/HttpOperatingSystemRepository';
import { HttpDeviceRepository } from './infrastructure/HttpDeviceRepository';
import { HttpUserRepository } from './infrastructure/HttpUserRepository';
import { HttpTrialLogRepository } from './infrastructure/HttpTrialLogRepository';

export interface DeviceAssignmentDependencies {
    assignmentRepository: IAssignmentRepository;
    assignmentUserRepository: IUserRepository;
    accessoryRepository: IAccessoryRepository;
    deviceRepository: IDeviceRepository;
    departmentRepository: IDepartmentRepository;
    locationRepository: ILocationRepository;
    operatingSystemRepository: IOperatingSystemRepository;
    trialLogRepository: ITrialLogRepository;
}

export function createDeviceAssignmentDependencies(): DeviceAssignmentDependencies {
    return {
        assignmentRepository: new HttpAssignmentRepository(),
        assignmentUserRepository: new HttpUserRepository(),
        accessoryRepository: new HttpAccessoryRepository(),
        deviceRepository: new HttpDeviceRepository(),
        departmentRepository: new HttpDepartmentRepository(),
        locationRepository: new HttpLocationRepository(),
        operatingSystemRepository: new HttpOperatingSystemRepository(),
        trialLogRepository: new HttpTrialLogRepository(),
    };
}
