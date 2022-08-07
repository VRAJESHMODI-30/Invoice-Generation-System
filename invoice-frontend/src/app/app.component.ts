import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
// import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'invoice-frontend';
  text:boolean = true;
  
// constructor(private router:Router){}

  ngOnInit(){
    if(screen.width<=750){
      this.text = false;
      if(window.location.href === 'http://192.168.29.66:4200/new-invoice'){
        if(document.getElementById('sideBar').style.width != "5%"){
          document.getElementById('sideBar').style.width='5%';
          document.getElementById('con').style.marginLeft = '6%';
          
        }
      }
      else if(window.location.href === 'http://192.168.29.66:4200/'){
        if(document.getElementById('sideBar').style.width != "9.5%"){
          document.getElementById('sideBar').style.width='9.5%';
          document.getElementById('con').style.marginLeft = '10.5%';
          
        }
      }
      else if(window.location.href === 'http://192.168.29.66:4200/item'){
        if(document.getElementById('sideBar').style.width != "13%"){
          document.getElementById('sideBar').style.width='13%';
          document.getElementById('con').style.marginLeft = '14%';
          
        }
      }
      else if(window.location.href === 'http://192.168.29.66:4200/preview-invoice'){
        if(document.getElementById('sideBar').style.width != "13%"){
          document.getElementById('sideBar').style.width='13%';
          document.getElementById('con').style.marginLeft = '14%';
          this.text=false; 
        }
      }
      else if(window.location.href === 'http://192.168.29.66:4200/new-item'){
        if(document.getElementById('sideBar').style.width != "8%"){
          document.getElementById('sideBar').style.width='8%';
          document.getElementById('con').style.marginLeft = '9%';
          this.text=false; 
        }
      }
    }
  }
  
  toggle(){
     if(screen.width<=750){
      if(window.location.href === 'http://192.168.29.66:4200/new-invoice'){
        if(document.getElementById('sideBar').style.width != "5%"){
          document.getElementById('sideBar').style.width='5%';
          document.getElementById('con').style.marginLeft = '6%';
          this.text = false;
        }
        else{
          document.getElementById('sideBar').style.width = "15%";
          document.getElementById('con').style.marginLeft = '33%';
          this.text=true;
        }
      }
      else if(window.location.href === 'http://192.168.29.66:4200/'){
        if(document.getElementById('sideBar').style.width != "9.5%"){
          document.getElementById('sideBar').style.width='9.5%';
          document.getElementById('con').style.marginLeft = '10.5%';
          this.text=false; 
        }
        else{
          document.getElementById('sideBar').style.width = "23%";
          document.getElementById('con').style.marginLeft = '33%';
          this.text = true;
        }
      }
      else if(window.location.href === 'http://192.168.29.66:4200/item'){
        if(document.getElementById('sideBar').style.width != "13%"){
          document.getElementById('sideBar').style.width='13%';
          document.getElementById('con').style.marginLeft = '14%';
          this.text=false; 
        }
        else{
          document.getElementById('sideBar').style.width = "28%";
          document.getElementById('con').style.marginLeft = '35%';
          this.text = true;
        }
      }
      else if(window.location.href === 'http://192.168.29.66:4200/preview-invoice'){
        if(document.getElementById('sideBar').style.width != "13%"){
          document.getElementById('sideBar').style.width='13%';
          document.getElementById('con').style.marginLeft = '14%';
          this.text=false; 
        }
        else{
          document.getElementById('sideBar').style.width = "27%";
          document.getElementById('con').style.marginLeft = '33%';
          this.text = true;
        }
      }
      else if(window.location.href === 'http://192.168.29.66:4200/new-item'){
        if(document.getElementById('sideBar').style.width != "8%"){
          document.getElementById('sideBar').style.width='8%';
          document.getElementById('con').style.marginLeft = '9%';
          this.text=false; 
        }
        else{
          document.getElementById('sideBar').style.width = "17%";
          document.getElementById('con').style.marginLeft = '24%';
          this.text = true;
        }
      }
      }
  }
}
