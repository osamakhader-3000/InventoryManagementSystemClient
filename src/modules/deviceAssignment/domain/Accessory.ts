import AccessoryValidationError from "./AccessoryValidationError";

export interface AccessoryProps {
    name: string;
    quantity: number;
    date: Date|null;
}

export default class Accessory {
    id: string|null;
    name: string;
    quantity: number;
    assignedQuantity: number;
    availableQuantity: number;
    date: Date|null;
    constructor(
        id: string|null,
        name: string,
        quantity: number,
        assignedQuantity: number,
        availableQuantity: number,
        date: Date|null
    ) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.assignedQuantity = assignedQuantity;
        this.availableQuantity = availableQuantity;
        this.date = date;
    }

    static create(props: AccessoryProps): Accessory {
        Accessory.ensureValid(props);
        return new Accessory("00000000-0000-0000-0000-000000000000", props.name.trim(), props.quantity, 0, props.quantity, props.date);
    }

    static update(id: string, changes: AccessoryProps, assignedQuantity: number): Accessory {
        Accessory.ensureValid(changes, assignedQuantity);
        return new Accessory(id, changes.name.trim(), changes.quantity, 0, changes.quantity, changes.date);
    }

    private static ensureValid(props: AccessoryProps, assignedQuantity = 0): void {
        if (!props.name.trim())
            throw new AccessoryValidationError("An accessory must have a name");
        if (!Number.isInteger(props.quantity))
            throw new AccessoryValidationError("Quantity must be a whole number");
        if (props.quantity < 0)
            throw new AccessoryValidationError("Quantity cannot be negative");
        if (props.quantity < assignedQuantity)
            throw new AccessoryValidationError(`Quantity cannot be less than the assigned quantity (${assignedQuantity})`);
        if (!props.date)
            throw new AccessoryValidationError("An accessory must have a date");
    }

    static fromId(id: string): Accessory {
        return new Accessory(id, "", 0, 0, 0, null);
    }

}
