import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Invoice } from 'src/app/models/invoice.model';
import { InvoiceService } from 'src/app/models/invoice.service';
import { Item } from 'src/app/models/item.model';
import { Router } from '@angular/router';
// import { formatDate } from '@angular/common';

@Component({
  selector: 'app-new-invoice',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.css']
})
export class NewInvoiceComponent implements OnInit {

  constructor(private _invoiceService:InvoiceService , private router:Router) { }

  public state:Array<String>= [ "Andhra Pradesh",
                "Arunachal Pradesh",
                "Assam",
                "Bihar",
                "Chhattisgarh",
                "Goa",
                "Gujarat",
                "Haryana",
                "Himachal Pradesh",
                "Jammu and Kashmir",
                "Jharkhand",
                "Karnataka",
                "Kerala",
                "Madhya Pradesh",
                "Maharashtra",
                "Manipur",
                "Meghalaya",
                "Mizoram",
                "Nagaland",
                "Odisha",
                "Punjab",
                "Rajasthan",
                "Sikkim",
                "Tamil Nadu",
                "Telangana",
                "Tripura",
                "Uttarakhand",
                "Uttar Pradesh",
                "West Bengal",
                "Andaman and Nicobar Islands",
                "Chandigarh",
                "Dadra and Nagar Haveli",
                "Daman and Diu",
                "Delhi",
                "Lakshadweep",
                "Puducherry"]

  private orgState:String = "Maharashtra";
  public suppState:String;

  public Itm_Obj:any;
   
  public igstValid = false; //by default sgst and cgst
  public dis_type = true; //Which means "rupees" (by default)
  public tax_type:boolean;

  public gst_value:number=0;
  public tds_value:number=0;
  public tcs_value:number=0;

  public sub_Total:number = 0.00;
  public discount:number = 0.00;
  public TDS_TCS:number = 0.00;
  public Adjusment:number = 0.00;
  public grand_Total:number = 0.00;
  public igstSet = new Map(); 
  public gstSet = new Map();
  date = this.formatDt(new Date());
  InvoiceModel:Invoice;
  nameSet = new Set(); 

  refreshInvoiceList(){
    this._invoiceService.getInvoice().subscribe((res)=>{
      const Data:any = res;
       for(let i=0;i<Data.length;i++){
        this.nameSet.add(Data[i].Cus_nm);
       }
       console.log(this.nameSet);
    })
  }

  ngOnInit() {
    this.refreshInvoiceList();
    // for(let i=0;i<50;i++){
    //   this.Itm_Obj.push(new Item("",0,0,"",0,0));
    // }
    if(!this._invoiceService.getUpdateFlag()){
      this.Itm_Obj = [new Item("",0,0,"",0,0)];
      this.InvoiceModel = new Invoice(this.orgState,"","","","","",this.date,"",this.date,"","",this.Itm_Obj,0,new Map(),"",0,0,"",0,0,0,0); 
    }
    else{
      this.InvoiceModel = this._invoiceService.getInvoiceData();
      this.orgState = this.InvoiceModel.Org_des;
      this.suppState = this.InvoiceModel.pos;
      this.Itm_Obj = this.InvoiceModel.Itm;
      this.sub_Total = this.InvoiceModel.Sub_tot;
      this.discount = this.InvoiceModel.Dis_val;
      if(this.InvoiceModel.tds_tcs === "tds"){
        this.tax_type = true;
        this.tds_value = -1*this.InvoiceModel.tax_per;
      }else{
        this.tax_type = false;
        this.tcs_value = this.InvoiceModel.tax_per;
      }
      this.TDS_TCS = this.InvoiceModel.tax_val;
      this.Adjusment = this.InvoiceModel.Adj;
      this.grand_Total = this.InvoiceModel.Grd_tot;
      if(this.orgState === this.suppState){
        this.igstValid = false;
        for(let i=0;i<this.Itm_Obj.length;i++)
        {
          if(!this.gstSet.has(+this.Itm_Obj[i].Itm_tax)){
            this.gstSet.set(+this.Itm_Obj[i].Itm_tax,this.Itm_Obj[i].Itm_gstCharge);
          }
          else{
            let a = this.gstSet.get(+this.Itm_Obj[i].Itm_tax);
            this.gstSet.delete(+this.Itm_Obj[i].Itm_tax);
            this.gstSet.set(+this.Itm_Obj[i].Itm_tax,a+this.Itm_Obj[i].Itm_gstCharge);
          }
        }
      } 
      else{
        this.igstValid = true;
        for(let i=0;i<this.Itm_Obj.length;i++)
        {
          if(!this.igstSet.has(+this.Itm_Obj[i].Itm_tax)){
            this.igstSet.set(+this.Itm_Obj[i].Itm_tax,this.Itm_Obj[i].Itm_gstCharge);
          }
          else{
            let a = this.igstSet.get(+this.Itm_Obj[i].Itm_tax);
            this.igstSet.delete(+this.Itm_Obj[i].Itm_tax);
            this.igstSet.set(+this.Itm_Obj[i].Itm_tax,a+this.Itm_Obj[i].Itm_gstCharge);
          }
        }     
      } 
    }   
  }

 onSubmit(){
  this.InvoiceModel.st = "Draft";
  this.InvoiceModel.Sub_tot = this.sub_Total;
  if(this.InvoiceModel.tds_tcs === "tds"){
    this.InvoiceModel.tax_per = this.tds_value;
  }
  else{
    this.InvoiceModel.tax_per = this.tcs_value;
  }
  this.InvoiceModel.tax_val = this.TDS_TCS;
  if(this.igstValid){
    this.InvoiceModel.gstArr = this.igstSet;
  }
  else{
    this.InvoiceModel.gstArr = this.gstSet;
  }
  this.InvoiceModel.Dis_val = this.discount;
  this.InvoiceModel.Grd_tot = this.grand_Total;
  this._invoiceService.setInvoiceData(this.InvoiceModel);
  console.log("submit");
  console.log(this.InvoiceModel);
  if(!this._invoiceService.getUpdateFlag()){
    this._invoiceService.postInvoice(this.InvoiceModel).subscribe(result=>{console.log("Submitted",result)},error=>console.error("Error",error)); 
  }
  else{
    this._invoiceService.updateInvoice(this.InvoiceModel).subscribe(result=>{console.log("Updated",result)},error=>console.error("Error",error));
    this._invoiceService.setUpdateFlag(false); 
  }
  this.router.navigateByUrl('/preview-invoice');
 }

 formatDt(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

 onChange(InvoiceForm:NgForm){
  this.suppState = this.InvoiceModel.pos;
  if(this.orgState != this.suppState){
    this.igstValid = true;
  }else{
    this.igstValid=false;
  }
 }

itm_onChange(Element:any){
  Element.Itm_amt = Element.Itm_qty*Element.Itm_rate;
  this.sub_Total=0; 
  for(let i=0;i<this.Itm_Obj.length;i++){
    this.sub_Total+= this.Itm_Obj[i].Itm_amt;
  }
  this.grand_Total = this.sub_Total+this.discount+this.gst_value+this.TDS_TCS+this.Adjusment;
  Element.Itm_gstCharge = (+Element.Itm_tax*Element.Itm_amt+this.discount)/100;
  if(this.igstValid){
    this.igstSet.clear();
    for(let i=0;i<this.Itm_Obj.length;i++)
    {
      if(!this.igstSet.has(+this.Itm_Obj[i].Itm_tax)){
        this.igstSet.set(+this.Itm_Obj[i].Itm_tax,this.Itm_Obj[i].Itm_gstCharge);
      }
      else{
        let a = this.igstSet.get(+this.Itm_Obj[i].Itm_tax);
        this.igstSet.delete(+this.Itm_Obj[i].Itm_tax);
        this.igstSet.set(+this.Itm_Obj[i].Itm_tax,a+this.Itm_Obj[i].Itm_gstCharge);
      }
    }
  }
  else{
    this.gstSet.clear();
    for(let i=0;i<this.Itm_Obj.length;i++)
    {
      if(!this.gstSet.has(+this.Itm_Obj[i].Itm_tax)){
        this.gstSet.set(+this.Itm_Obj[i].Itm_tax,this.Itm_Obj[i].Itm_gstCharge);
      }
      else{
        let a = this.gstSet.get(+this.Itm_Obj[i].Itm_tax);
        this.gstSet.delete(+this.Itm_Obj[i].Itm_tax);
        this.gstSet.set(+this.Itm_Obj[i].Itm_tax,a+this.Itm_Obj[i].Itm_gstCharge);
      }
    }
  }
  this.gst_value = 0;
  for(let i=0;i<this.Itm_Obj.length;i++){
    this.gst_value += this.Itm_Obj[i].Itm_gstCharge;
  }
  this.grand_Total = this.sub_Total+this.discount+this.gst_value+this.TDS_TCS+this.Adjusment;
}

discount_onChange(Element:any){
  this.sub_Total=0;
  for(let i=0;i<this.Itm_Obj.length;i++){
    this.sub_Total+= this.Itm_Obj[i].Itm_amt;
  }
  if(this.dis_type){
    this.discount = -this.InvoiceModel.Dis;
  }else{
    this.discount = -(this.sub_Total/this.InvoiceModel.Dis)*100;
  }
  this.grand_Total = this.sub_Total+this.discount+this.gst_value+this.TDS_TCS+this.Adjusment;
}

 disUnit_onChange(e:any){
  if(e.target.value == "percentage"){
    this.dis_type=false;
  }else{
    this.dis_type = true;
  }

  if(this.dis_type == true){
    this.discount = -this.InvoiceModel.Dis;
  }else{
    this.discount = - (this.sub_Total*this.InvoiceModel.Dis)/100;
  }
  this.gst_value = 0;
  for(let i=0;i<this.Itm_Obj.length;i++){
    this.gst_value += this.Itm_Obj[i].Itm_gstCharge;
  }
  this.grand_Total = this.sub_Total+this.discount+this.gst_value+this.TDS_TCS+this.Adjusment;
 }

taxType_onChange(Element:any){
  if(Element.target.value == "tcs"){
    this.tax_type = false;
  }else if(Element.target.value == "tds"){
    this.tax_type = true;
  }
}

tds_tcs_onChange(Element:any){
  if(this.InvoiceModel.tds_tcs == "tcs")this.tax_type=false;
  else if(this.InvoiceModel.tds_tcs == "tds")this.tax_type=true;
  if(this.tax_type){
    this.tds_value = Element.target.value;
    this.TDS_TCS = -(this.grand_Total*(this.tds_value))/100;
    this.tds_value = -Element.target.value;
  }
  else if(this.tax_type==false){
    this.tcs_value = Element.target.value;
    this.TDS_TCS = (this.grand_Total*(this.tcs_value))/100;
  }
  this.grand_Total = this.sub_Total+this.discount+this.gst_value+this.TDS_TCS+this.Adjusment;
}

adj_onChange(Element:any){
  this.Adjusment = this.InvoiceModel.Adj;
  this.grand_Total = this.sub_Total+this.discount+this.gst_value+this.TDS_TCS+this.Adjusment; 
}

addRow(){
  this.Itm_Obj.push(new Item("",0,0,"",0,0));
  console.log(this.Itm_Obj);
}

cancleClk(){
  var a = confirm("Are you sure?");
  if(a){
    this.router.navigateByUrl("/");
  }
}

sendEmail(){
  this.InvoiceModel.Grd_tot = this.grand_Total;
  this._invoiceService.setInvoiceData(this.InvoiceModel);
  this.router.navigateByUrl("/send-email");
}
}
