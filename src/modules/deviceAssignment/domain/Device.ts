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
}
