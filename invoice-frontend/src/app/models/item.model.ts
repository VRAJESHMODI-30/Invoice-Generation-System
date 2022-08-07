export class Item {
    Itm_info:String;
    Itm_qty:number;
    Itm_rate:number;
    Itm_tax:String;
    Itm_amt:number;
    Itm_gstCharge:number;

    constructor(details:String,qty:number,rate:number,tax:String,amt:number,gstCharge:number){
        this.Itm_info = details;
        this.Itm_qty = qty;
        this.Itm_rate = rate;
        this.Itm_tax = tax;
        this.Itm_amt = amt;
        this.Itm_gstCharge = gstCharge;
    }
}
