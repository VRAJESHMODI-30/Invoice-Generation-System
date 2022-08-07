export class Invoice {

      // General tags for invoice_list and invoice_creation 
      // Inv_num:String;
      // Cus_nm:String;
      // Ord_num:String;
      // Inv_dt:Date;
      // Term:String;
      // Due_dt:Date;
      // Subj:String;
      // Amt:Number;
      // Bal_due:Number;
      // St:String;

      // Used in invoice creation only
      // Itm:Array<Object>; // array of object used to store customer items 
      // Cus_note:String;
      // Dis:Number;
      // GSt:String;
      // Adj:Number;
      // Tot:Number;

      constructor(
            public Org_des:String,
            public Cus_nm:String,
            public gstin:String,
            public pos:String,
            public Inv_num:String,
            public Ord_num:String,
            public Inv_dt:any,
            public Term :String,
            public Due_dt:any,
            public Subj:String,
            public st:String,
            public Itm:Array<Object>,
            
            public Sub_tot:number,
            public gstArr:Map<number,number>,
            public Cus_note:String,
            public Dis:number,
            public Dis_val:number,
            public tds_tcs:String,
            public tax_per:number,
            public tax_val:number,
            public Adj:number,
            public Grd_tot:number
      ){}
}
