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
    date: Date|null;
    constructor(
        id: string|null,
        name: string,
        quantity: number,
        date: Date|null
    ) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.date = date;
    }

    static create(props: AccessoryProps): Accessory {
        Accessory.ensureValid(props);
        return new Accessory("00000000-0000-0000-0000-000000000000", props.name.trim(), props.quantity, props.date);
    }

    static update(id: string, changes: AccessoryProps): Accessory {
        Accessory.ensureValid(changes);
        return new Accessory(id, changes.name.trim(), changes.quantity, changes.date);
    }

    private static ensureValid(props: AccessoryProps): void {
        if (!props.name.trim())
            throw new AccessoryValidationError("An accessory must have a name");
        if (!Number.isInteger(props.quantity))
            throw new AccessoryValidationError("Quantity must be a whole number");
        if (props.quantity < 0)
            throw new AccessoryValidationError("Quantity cannot be negative");
    }

    static fromId(id: string): Accessory {
        return new Accessory(id, "", 0, null);
    }

}
