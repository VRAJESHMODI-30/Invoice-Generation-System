import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { NewInvoiceComponent } from './components/new-invoice/new-invoice.component';
import { ItemComponent } from './components/item/item.component';
import { NewItemComponent } from './components/new-item/new-item.component';
import { PreviewInvoiceComponent } from './components/preview-invoice/preview-invoice.component';
import { SendEmailComponent } from './components/send-email/send-email.component';

const routes: Routes = [
  {path:'',component:InvoiceComponent},
  {path:'new-invoice',component:NewInvoiceComponent},
  {path:'item',component:ItemComponent},
  {path:'new-item',component:NewItemComponent},
  {path:'preview-invoice',component:PreviewInvoiceComponent},
  {path:'send-email',component:SendEmailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
