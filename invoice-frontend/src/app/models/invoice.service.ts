import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Invoice } from './invoice.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  invoiceList:any;
  Invoice_Data:Invoice;
  editData:boolean;

  _url = "http://localhost:3000/invoice/";
  constructor(private _http:HttpClient) { }

  postInvoice(data:Invoice){
    return this._http.post(this._url,data);
  }

  getInvoice(){
    return this._http.get(this._url);
  }

 setInvoiceData(data:Invoice){
    this.Invoice_Data = data;
 }

 setUpdateFlag(flag:boolean){
  this.editData = flag;
 }

 getUpdateFlag(){
  return this.editData;
 }

 getInvoiceData(){
  return this.Invoice_Data;
 }

 updateInvoice(data:Invoice){
  return this._http.put(this._url,data);
 }
}
