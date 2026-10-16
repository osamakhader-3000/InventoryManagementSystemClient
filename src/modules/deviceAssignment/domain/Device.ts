import DeviceValidationError from "./DeviceValidationError";
import { DeviceStatus } from "./DeviceStatus";
import OperatingSystem from "./OperatingSystem";

export interface DeviceProps {
    model: string;
    serialNumber: string;
    operatingSystem: OperatingSystem|null;
    specs: string;
    purchasedDate: Date|null;
    retirementDate: Date|null;
    price: number;
    soldPrice: number;
    status: DeviceStatus;
}

export default class Device {
    id: string|null;
    model: string;
    serialNumber: string;    
    operatingSystem: OperatingSystem|null;
    specs: string;
    purchasedDate: Date|null;
    retirementDate: Date|null;
    price: number;
    soldPrice: number;
    status: DeviceStatus;
    constructor(
        id: string|null,
        model: string,
        serialNumber: string,        
        operatingSystem: OperatingSystem|null,
        specs: string,
        purchasedDate: Date|null,
        retirementDate: Date|null,
        price: number,
        soldPrice: number,
        status: DeviceStatus = DeviceStatus.New,
    ) {
        this.id = id;
        this.model = model;
        this.serialNumber = serialNumber;
        this.operatingSystem = operatingSystem;
        this.specs = specs;
        this.purchasedDate = purchasedDate;
        this.retirementDate = retirementDate;
        this.price = price;
        this.soldPrice = soldPrice;
        this.status = status;
    }

    static create(props: DeviceProps): Device {
        Device.ensureValid(props);
        return new Device(
            "00000000-0000-0000-0000-000000000000",
            props.model.trim(),
            props.serialNumber.trim(),
            props.operatingSystem,
            props.specs,
            props.purchasedDate,
            props.retirementDate,
            props.price,
            props.soldPrice,
            props.status
        );
    }

    static update(existing: Device, changes: DeviceProps): Device {
        Device.ensureValid(changes);
        return new Device(
            existing.id,
            changes.model.trim(),
            changes.serialNumber.trim(),
            changes.operatingSystem,
            changes.specs,
            changes.purchasedDate,
            changes.retirementDate,
            changes.price,
            changes.soldPrice,
            changes.status
        );
    }

    private static ensureValid(props: DeviceProps): void {
        if (!props.serialNumber.trim())
            throw new DeviceValidationError("A device must have a serial number");
        if (!props.model.trim())
            throw new DeviceValidationError("A device must have a model");
        if (!props.operatingSystem?.id)
            throw new DeviceValidationError("An OS must be selected");
        if (!props.purchasedDate)
            throw new DeviceValidationError("A purchase date must be selected");
        if (props.price < 0 || props.soldPrice < 0)
            throw new DeviceValidationError("Prices cannot be negative");
        if (props.purchasedDate && props.retirementDate && props.retirementDate < props.purchasedDate)
            throw new DeviceValidationError("Retirement date cannot be before purchase date");
    }

    // Reference to a device known only by its serial number (until the form has a device picker).
    static fromSerialNumber(serialNumber: string): Device {
        return new Device(null, "", serialNumber.trim(), null, "", null, null, 0, 0);
    }
}
