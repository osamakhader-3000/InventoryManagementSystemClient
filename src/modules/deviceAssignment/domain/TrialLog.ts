import { LogEntityType } from "./LogEntityType";
import { TransactionType } from "./TransactionType";

export default class TrialLog {
    id: number;
    deviceId: string;
    deviceModel: string;
    deviceSerialNumber: string;
    // Null for device events, which have no inventory user
    userId: string | null;
    userName: string;
    eventDate: Date;
    transactionType: TransactionType;
    agentId: string;
    agentName: string;
    locationName: string;
    status: string;
    entityType: LogEntityType;
    constructor(
        id: number,
        deviceId: string,
        deviceModel: string,
        deviceSerialNumber: string,
        userId: string | null,
        userName: string,
        eventDate: Date,
        transactionType: TransactionType,
        agentId: string,
        agentName: string,
        locationName: string,
        status: string,
        entityType: LogEntityType
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
        this.locationName = locationName;
        this.status = status;
        this.entityType = entityType;
    }
}
