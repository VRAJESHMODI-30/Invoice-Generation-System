import { Component, OnInit } from '@angular/core';
import { InvoiceService } from 'src/app/models/invoice.service';
import { Invoice } from 'src/app/models/invoice.model';
import { Item } from 'src/app/models/item.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
 
 public invoices:any = [];

  constructor(private shared:InvoiceService , private router:Router) { }

  refreshInvoiceList(){
    this.shared.getInvoice().subscribe((res)=>{
      console.log(res);
      this.invoices = res;
    })
  }

  editInvoice(ele:Invoice){
    console.log(ele);
    this.shared.setInvoiceData(ele);
    this.shared.setUpdateFlag(true);
    this.router.navigateByUrl('/new-invoice');
  }

  newBtnClicked(){
    this.shared.setUpdateFlag(false);
  }

  ngOnInit() {
    this.refreshInvoiceList();
  }
  
}
