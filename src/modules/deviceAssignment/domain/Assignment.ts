import Device from './Device';
import User from './User';
import Accessory from './Accessory';
import AssignmentValidationError from './AssignmentValidationError';

export default class Assignment {
    id: bigint|null;
    device: Device;
    assignedUser: User;
    assignmentDate: Date|null;
    returnDate: Date|null;
    oldUser: User|null;
    accessories: Accessory[];
    remarks: string;
    headset: string|null;
    lastUpdateDate: Date|null;
    constructor(
        id: bigint|null,
        device: Device,
        assignedUser: User,
        assignmentDate: Date|null,
        returnDate: Date|null,
        oldUser: User|null,
        accessories: Accessory[],
        remarks: string,
        headset: string|null,
        lastUpdateDate: Date|null
    ) {
        this.id = id;
        this.device = device;
        this.assignedUser = assignedUser;
        this.assignmentDate = assignmentDate;
        this.returnDate = returnDate;
        this.oldUser = oldUser;
        this.accessories = accessories;
        this.remarks = remarks;
        this.headset = headset;
        this.lastUpdateDate = lastUpdateDate;
    }

    // Static so they also work on plain objects returned by the API, not just class instances.
    static create(props: {
        assignedUser: User;
        device: Device;
        remarks: string;
        accessories?: Accessory[];
    }): Assignment {
        Assignment.ensureValid(props.assignedUser, props.device);
        return new Assignment(
            null,
            props.device,
            props.assignedUser,
            null,
            null,
            null,
            props.accessories ?? [],
            props.remarks,
            null,
            null
        );
    }

    static update(existing: Assignment, changes: {
        assignedUser: User;
        device: Device;
        remarks: string;
        accessories?: Accessory[];
    }): Assignment {
        Assignment.ensureValid(changes.assignedUser, changes.device);
        const isReassigned = existing.assignedUser.id !== changes.assignedUser.id;
        return new Assignment(
            existing.id,
            changes.device,
            changes.assignedUser,
            existing.assignmentDate,
            existing.returnDate,
            isReassigned ? existing.assignedUser : existing.oldUser,
            changes.accessories ?? [],
            changes.remarks,
            existing.headset,
            new Date()
        );
    }

    private static ensureValid(assignedUser: User, device: Device) {
        if (!assignedUser.id)
            throw new AssignmentValidationError("An assignment must have a user");
        if (device.serialNumber.trim() === "")
            throw new AssignmentValidationError("Serial Number cannot be empty");
    }
}
