import DeviceValidationError from "./DeviceValidationError";

export interface DeviceProps {
    model: string;
    serialNumber: string;
    specs: string;
    purchasedDate: Date|null;
    retirementDate: Date|null;
    price: number;
    soldPrice: number;
    status: string;
}

export default class Device {
    id: string|null;
    model: string;
    serialNumber: string;    
    specs: string;
    purchasedDate: Date|null;
    retirementDate: Date|null;
    price: number;
    soldPrice: number;
    status: string;
    isAssigned: number;
    isSold: number;
    constructor(
        id: string|null,
        model: string,
        serialNumber: string,        
        specs: string,
        purchasedDate: Date|null,
        retirementDate: Date|null,
        price: number,
        soldPrice: number,
        status: string = "",
        isAssigned: number = 0,
        isSold: number = 0,
    ) {
        this.id = id;
        this.model = model;
        this.serialNumber = serialNumber;
        this.specs = specs;
        this.purchasedDate = purchasedDate;
        this.retirementDate = retirementDate;
        this.price = price;
        this.soldPrice = soldPrice;
        this.status = status;
        this.isAssigned = isAssigned;
        this.isSold = isSold;
    }

    static create(props: DeviceProps): Device {
        Device.ensureValid(props);
        return new Device(
            "00000000-0000-0000-0000-000000000000",
            props.model.trim(),
            props.serialNumber.trim(),
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
            changes.specs,
            changes.purchasedDate,
            changes.retirementDate,
            changes.price,
            changes.soldPrice,
            changes.status,
            existing.isAssigned,
            existing.isSold
        );
    }

    private static ensureValid(props: DeviceProps): void {
        if (!props.serialNumber.trim())
            throw new DeviceValidationError("A device must have a serial number");
        if (!props.model.trim())
            throw new DeviceValidationError("A device must have a model");
        if (!props.purchasedDate)
            throw new DeviceValidationError("A purchase date must be selected");
        if (props.price < 0 || props.soldPrice < 0)
            throw new DeviceValidationError("Prices cannot be negative");
        if (props.purchasedDate && props.retirementDate && props.retirementDate < props.purchasedDate)
            throw new DeviceValidationError("Retirement date cannot be before purchase date");
    }

    // Reference to an existing device known only by its id.
    static fromId(id: string, isAssigned: number = 0): Device {
        return new Device(id, "", "", "", null, null, 0, 0, "", isAssigned);
    }
}
