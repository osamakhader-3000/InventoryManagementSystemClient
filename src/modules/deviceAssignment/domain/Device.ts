import DeviceValidationError from "./DeviceValidationError";

export interface DeviceProps {
    model: string;
    serialNumber: string;
    os: string;
    specs: string;
    purchasedDate: Date|null;
    retirementDate: Date|null;
    price: number;
    soldPrice: number;
}

export default class Device {
    id: string|null;
    model: string;
    serialNumber: string;    
    os: string;
    specs: string;
    purchasedDate: Date|null;
    retirementDate: Date|null;
    price: number;
    soldPrice: number;
    constructor(
        id: string|null,
        model: string,
        serialNumber: string,        
        os: string,
        specs: string,
        purchasedDate: Date|null,
        retirementDate: Date|null,
        price: number,
        soldPrice: number,
    ) {
        this.id = id;
        this.model = model;
        this.serialNumber = serialNumber;
        this.os = os;
        this.specs = specs;
        this.purchasedDate = purchasedDate;
        this.retirementDate = retirementDate;
        this.price = price;
        this.soldPrice = soldPrice;
    }

    static create(props: DeviceProps): Device {
        Device.ensureValid(props);
        return new Device(
            null,
            props.model.trim(),
            props.serialNumber.trim(),
            props.os,
            props.specs,
            props.purchasedDate,
            props.retirementDate,
            props.price,
            props.soldPrice
        );
    }

    static update(existing: Device, changes: DeviceProps): Device {
        Device.ensureValid(changes);
        return new Device(
            existing.id,
            changes.model.trim(),
            changes.serialNumber.trim(),
            changes.os,
            changes.specs,
            changes.purchasedDate,
            changes.retirementDate,
            changes.price,
            changes.soldPrice
        );
    }

    private static ensureValid(props: DeviceProps): void {
        if (!props.serialNumber.trim())
            throw new DeviceValidationError("A device must have a serial number");
        if (!props.model.trim())
            throw new DeviceValidationError("A device must have a model");
        if (props.price < 0 || props.soldPrice < 0)
            throw new DeviceValidationError("Prices cannot be negative");
        if (props.purchasedDate && props.retirementDate && props.retirementDate < props.purchasedDate)
            throw new DeviceValidationError("Retirement date cannot be before purchase date");
    }

    // Reference to a device known only by its serial number (until the form has a device picker).
    static fromSerialNumber(serialNumber: string): Device {
        return new Device(null, "", serialNumber.trim(), "", "", null, null, 0, 0);
    }
}
