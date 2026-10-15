import { IAssignmentRepository } from './domain/IAssignmentRepository';
import IAccessoryRepository from './domain/IAccessoryRepository';
import { IDepartmentRepository } from './domain/IDepartmentRepository';
import { ILocationRepository } from './domain/ILocationRepository';
import { IDeviceRepository } from './domain/IDeviceRepository';
import { IUserRepository } from './domain/IUserRepository';
import { HttpAssignmentRepository } from './infrastructure/HttpAssignmentRepository';
import { HttpAccessoryRepository } from './infrastructure/HttpAccessoryRepository';
import { HttpDepartmentRepository } from './infrastructure/HttpDepartmentRepository';
import { HttpLocationRepository } from './infrastructure/HttpLocationRepository';
import { HttpDeviceRepository } from './infrastructure/HttpDeviceRepository';
import { HttpUserRepository } from './infrastructure/HttpUserRepository';

export interface DeviceAssignmentDependencies {
    assignmentRepository: IAssignmentRepository;
    assignmentUserRepository: IUserRepository;
    accessoryRepository: IAccessoryRepository;
    deviceRepository: IDeviceRepository;
    departmentRepository: IDepartmentRepository;
    locationRepository: ILocationRepository;
}

export function createDeviceAssignmentDependencies(): DeviceAssignmentDependencies {
    return {
        assignmentRepository: new HttpAssignmentRepository(),
        assignmentUserRepository: new HttpUserRepository(),
        accessoryRepository: new HttpAccessoryRepository(),
        deviceRepository: new HttpDeviceRepository(),
        departmentRepository: new HttpDepartmentRepository(),
        locationRepository: new HttpLocationRepository(),
    };
}
