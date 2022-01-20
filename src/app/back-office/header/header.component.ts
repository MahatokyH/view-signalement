import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  out() : void {
    try {
      if(window.localStorage.getItem("token")!=null) {
        window.localStorage.removeItem("token");
        window.location.href="https://view-back-signalement.herokuapp.com/";
      }
    } catch (error) {
      
    }
  }
}
