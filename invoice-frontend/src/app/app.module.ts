import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { NewInvoiceComponent } from './components/new-invoice/new-invoice.component';
import { ItemComponent } from './components/item/item.component';
import { NewItemComponent } from './components/new-item/new-item.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PreviewInvoiceComponent } from './components/preview-invoice/preview-invoice.component';
import { SendEmailComponent } from './components/send-email/send-email.component';

@NgModule({
  declarations: [
    AppComponent,
    InvoiceComponent,
    NewInvoiceComponent,
    ItemComponent,
    NewItemComponent,
    PreviewInvoiceComponent,
    SendEmailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
