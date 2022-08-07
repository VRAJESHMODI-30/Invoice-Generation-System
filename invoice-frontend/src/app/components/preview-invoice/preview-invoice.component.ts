import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { InvoiceService } from 'src/app/models/invoice.service';
import { Invoice } from 'src/app/models/invoice.model';
import { Item } from 'src/app/models/item.model';
import jsPDF, { RGBAData } from 'jspdf';
import html2canvas from 'html2canvas';
import * as converter from 'number-to-words';
import upiqr from 'upiqr'; 
// import uniqid from 'uniqid';
import { Router } from '@angular/router';


@Component({
  selector: 'app-preview-invoice',
  templateUrl: './preview-invoice.component.html',
  styleUrls: ['./preview-invoice.component.css']
})
export class PreviewInvoiceComponent implements OnInit {

  Org_Gstin:any = "22AAAAA0000A1Z0";
  GrdTot_InWord:String;
  public Itm_Obj:any = [new Item("",0,0,"",0,0)]; 
  public InvoiceData:Invoice;
  public imgSrc:String;
  @ViewChild('content',{static:false}) srcCode!:ElementRef;


  constructor(private _Shared:InvoiceService, private router:Router) { }

  ngOnInit() {
    this.InvoiceData = this._Shared.getInvoiceData();
    this.makeUpiQr();
    this.GrdTot_InWord = converter.toWordsOrdinal(this.InvoiceData.Grd_tot);
    this.GrdTot_InWord = this.capitalizeFirstLetter(this.GrdTot_InWord);
    this.Itm_Obj = this.InvoiceData.Itm;

  }

  capitalizeFirstLetter(str:String) {
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
    return capitalized;
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
      // console.log(upi.qr);      
      // console.log(upi.intent); 
      qr.innerHTML = `<img src=${upi.qr} alt="Nothing"> <br> <h2 class="text-primary" style="font-size: medium;">Scan Qr to make your payment</h2>`
    })
    .catch(err => {
      console.log(err);
    });

  }

sharePDF(){
      var canvas_Data = document.getElementById('download-invoice');
      
      html2canvas(canvas_Data).then(canvas =>{
        var img = canvas.toDataURL("image/png");
        var whatsapp_url = `whatsapp://send?images=${img}`; 
        window.location.href = whatsapp_url;
      })
      
      // var whatsapp_url = "whatsapp://send?text=Hello world this is a message and a link http://www.example.com/image.jpg" 
      // var whatsapp_url = `https://wa.me/?text=${encodeURIComponent("hello")}` 
  
}

  makePDF(){
    console.log("Downloading started...");

    var tableHeadImg: string | HTMLCanvasElement | HTMLImageElement | Uint8Array | RGBAData;
    var imgUHeight:number;
    var botPosition:number;

    var data = document.getElementById('upperPart');
    var Hdata = document.getElementById('head');
    var Bdata = document.getElementById('bottom');

    html2canvas(Hdata).then(canvas =>{
      tableHeadImg = canvas.toDataURL('image/png');
      imgUHeight  = canvas.height * 190 / canvas.width;
    })

    var remainH:number;
    var doc = new jsPDF('p', 'mm');
    html2canvas(data).then(canvas => {
      var imgWidth = 190;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
  
      botPosition = imgHeight;
      while(botPosition>=295){
        botPosition -= 295;
      }

      const imgData = canvas.toDataURL('image/png')
      // var doc = new jsPDF('p', 'mm');
      var position = 0;
      
      doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      var a =10;
      var b =0;
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 10, position+a+b, imgWidth, imgHeight);
        a+=10;
        b++;
        doc.addImage(tableHeadImg,'PNG',10,0,imgWidth,imgUHeight);
        botPosition += imgUHeight;
        heightLeft -= pageHeight;
      }
      remainH = -1*heightLeft;
        // doc.addImage(BottomImg,'PNG',10,botPosition,190,imgBHeight);
        // doc.save('sample.pdf');
    });

    html2canvas(Bdata).then(canvas=>{
      var imgWidth = 190;
      var imgHeight  = canvas.height * imgWidth / canvas.width;
      var Img = canvas.toDataURL('image/png');
      if(remainH < imgHeight){
        doc.addPage();
        doc.addImage(Img,10,1,imgWidth,imgHeight);
      }
      else{
        doc.addImage(Img,10,botPosition,imgWidth,imgHeight);
      }
      doc.save('sample.pdf');
    })


  }
}
