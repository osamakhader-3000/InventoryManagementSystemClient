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

    // Reference to a device known only by its serial number (until the form has a device picker).
    static fromSerialNumber(serialNumber: string): Device {
        return new Device(null, "", serialNumber.trim(), "", "", null, null, 0, 0);
    }
}
