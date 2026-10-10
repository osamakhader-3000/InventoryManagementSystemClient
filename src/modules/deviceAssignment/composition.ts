import { IAssignmentRepository } from './domain/IAssignmentRepository';
import IAccessoryRepository from './domain/IAccessoryRepository';
import { IDepartmentRepository } from './domain/IDepartmentRepository';
import { IDeviceRepository } from './domain/IDeviceRepository';
import { IUserRepository } from './domain/IUserRepository';
import { HttpAssignmentRepository } from './infrastructure/HttpAssignmentRepository';
import { HttpAccessoryRepository } from './infrastructure/HttpAccessoryRepository';
import { HttpDepartmentRepository } from './infrastructure/HttpDepartmentRepository';
import { HttpDeviceRepository } from './infrastructure/HttpDeviceRepository';
import { HttpUserRepository } from './infrastructure/HttpUserRepository';

export interface DeviceAssignmentDependencies {
    assignmentRepository: IAssignmentRepository;
    assignmentUserRepository: IUserRepository;
    accessoryRepository: IAccessoryRepository;
    deviceRepository: IDeviceRepository;
    departmentRepository: IDepartmentRepository;
}

export function createDeviceAssignmentDependencies(): DeviceAssignmentDependencies {
    return {
        assignmentRepository: new HttpAssignmentRepository(),
        assignmentUserRepository: new HttpUserRepository(),
        accessoryRepository: new HttpAccessoryRepository(),
        deviceRepository: new HttpDeviceRepository(),
        departmentRepository: new HttpDepartmentRepository(),
    };
}
