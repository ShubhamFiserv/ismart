interface IPayment { 
    amount:number,
    paymentDate: Date,
    paymentType:string,
    category:string,
    description: string
 }

export class Payment implements IPayment {
    amount:number;
    paymentDate:Date;
    paymentType:string;
    category:string;
    description: string;
    
    constructor(){
        this.paymentType = "Make";
        this.category = "Misc";
        this.paymentDate = new Date();
    }
}