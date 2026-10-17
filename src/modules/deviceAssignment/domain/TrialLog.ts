import { TransactionType } from "./TransactionType";
import Device from "./Device";
import User from "./User";
import { ItemCondition } from "./ItemCondition";
import Location from "./Location";

export default class TrialLog {
    id: number;
    transactionType: TransactionType;
    device: Device;    
    tsmeSerialNumber: string;
    user: User;
    location: Location;
    itemCondition: ItemCondition;
    date: Date;
    agent: User;
    constructor(
        id: number,
        transactionType: TransactionType,
        device: Device,
        tsmeSerialNumber: string,
        user: User,
        location: Location,
        itemCondition: ItemCondition,
        date: Date,
        agent: User
    ) {
        this.id = id;
        this.transactionType = transactionType;
        this.device = device;
        this.tsmeSerialNumber = tsmeSerialNumber;
        this.user = user;
        this.location = location;
        this.itemCondition = itemCondition;
        this.date = date;
        this.agent = agent;
    }
}