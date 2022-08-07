import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  items = [
    {name:"Laptop",des:"It's a machine",rate:50000,qty:2},
    {name:"Air Conditioner",des:"It's a machine",rate:41500,qty:1},
  ]

}
