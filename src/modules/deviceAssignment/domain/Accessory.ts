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
}