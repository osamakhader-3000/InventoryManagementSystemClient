import { TransactionType } from "./TransactionType";

export default class TrialLog {
    id: number;
    deviceId: string;
    deviceModel: string;
    deviceSerialNumber: string;
    userId: string;
    userName: string;
    eventDate: Date;
    transactionType: TransactionType;
    agentId: string;
    agentName: string;
    constructor(
        id: number,
        deviceId: string,
        deviceModel: string,
        deviceSerialNumber: string,
        userId: string,
        userName: string,
        eventDate: Date,
        transactionType: TransactionType,
        agentId: string,
        agentName: string
    ) {
        this.id = id;
        this.deviceId = deviceId;
        this.deviceModel = deviceModel;
        this.deviceSerialNumber = deviceSerialNumber;
        this.userId = userId;
        this.userName = userName;
        this.eventDate = eventDate;
        this.transactionType = transactionType;
        this.agentId = agentId;
        this.agentName = agentName;
    }
}
