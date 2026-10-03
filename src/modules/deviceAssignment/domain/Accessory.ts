export default class Accessory {
    id: number|null;
    name: string;
    quantity: number;
    date: Date|null;
    constructor(
        id: number|null,
        name: string,
        quantity: number,
        date: Date|null
    ) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.date = date;
    }

    static fromId(id: number): Accessory {
        return new Accessory(id, "", 0, null);
    }

}