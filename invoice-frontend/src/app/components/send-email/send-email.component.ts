import { Component, OnInit } from '@angular/core';
import { InvoiceService } from 'src/app/models/invoice.service';
import { Invoice } from 'src/app/models/invoice.model';
import upiqr from 'upiqr';
declare const Email:any;

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit{

  InvoiceData:Invoice;
  email_from:String="";
  email_to:String="";
  email_subject:String="";
  email_cc:String="";
  email_bcc:String="";

  constructor(private _Shared:InvoiceService) { }

  ngOnInit(){
    if(screen.width<894){
      document.getElementById('outerBox').classList.remove('p-5');
      document.getElementById('lightYellow').classList.remove('col-10');
      document.getElementById('lightYellow').classList.add('col-12');
      document.getElementById('remove').classList.remove('col-1');
      document.getElementById('add').classList.add('col-12');
    }
    this.InvoiceData = this._Shared.getInvoiceData();
    this.makeUpiQr();
  }

  makeUpiQr(){
    var qr = document.getElementById('qr');
    upiqr({
      payeeVPA: 'UPI@VPA',
      payeeName: "UPI@PN",
      amount: this.InvoiceData.Grd_tot,
      // amount: 1,
      minimumAmount:0
    })
    .then((upi) => {
      console.log(upi.qr);      
      console.log(upi.intent); 
      qr.innerHTML = `<img src=${upi.qr} alt="Nothing" class="img-thumbnail"> <p class="text-primary">Scan Qr to make your payment</p>`
    })
    .catch(err => {
      console.log(err);
    });

  }

  sendEmail(){
    var body_data = document.getElementById("srcData");
    Email.send({
      // SecureToken: "ead06a96-c905-4d8a-8648-fb0883f60c75",
      Host: "smtp.elasticemail.com",
      Port: 2525,
      Username : "<elasticemail>",
      Password : "<Password>",
      From : this.email_from,
      To : this.email_to,
      Cc:this.email_cc,
      Bcc:this.email_bcc,
      Subject : this.email_subject,
      Body : body_data.innerHTML,
      Attachments:[
        {
          name:this.InvoiceData.Inv_num,
          data:""
        }
      ]
  }).then(
    (res:any) => alert("Mail sent successfully!")
  );
  }
}
