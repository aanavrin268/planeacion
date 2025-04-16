import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-item',
  imports: [CommonModule],
  templateUrl: './image-item.component.html',
  styleUrl: './image-item.component.scss'
})
export class ImageItemComponent implements OnInit {

  protected bundle: any;

  protected showInfo: boolean;

  constructor(){
      this.showInfo = false;

  }

  ngOnInit(): void {
    if(this.bundle){
      console.log("bundle received", this.bundle);
    }
  }

  turnOnInfo(){
    this.showInfo = !this.showInfo;
  }

}
