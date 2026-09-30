import Device from './Device';
import User from './User';
import Accessory from './Accessory';

export default class Assignment {
    id: bigint;
    device: Device;
    assignedUser: User;
    assignmentDate: Date;
    returnDate: Date|null;
    oldUser: User;
    accessories: Accessory[];    
    remarks: string;
    headset: string;
    lastUpdateDate: Date|null;
    constructor(
        id: bigint,
        device: Device,
        assignedUser: User,
        assignmentDate: Date,
        returnDate: Date|null,
        oldUser: User,
        accessories: Accessory[],
        remarks: string,
        headset: string,
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
}