import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 
  //header showing on top header
  header:string = 'I Smart';
  constructor() { }

  ngOnInit(): void {
  }

}
