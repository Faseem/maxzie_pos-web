import { Component, OnInit } from '@angular/core';
import { ItemDto } from '../common/dto/itemDto';

@Component({
  selector: 'app-grn',
  templateUrl: './grn.component.html',
  styleUrls: ['./grn.component.scss']
})
export class GrnComponent implements OnInit {

  selectedItem: ItemDto;

  constructor() { }

  ngOnInit() {
  }

  onItemSelectedEvent(selectedItem:ItemDto){
    console.log(selectedItem);
  }

}
