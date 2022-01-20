import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  login: boolean | undefined;
  private userSub: Subscription | undefined;
  access=false ;
  title = 'projet';
  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.route.url.subscribe((value:any) => {
      var url = location.href.split("https://view-back-signalement.herokuapp.com/")[1];
      var token = window.localStorage.getItem("token"); 
      //this.userService.testToken(token); 
      if (url.length == 0 || url.toLowerCase() == "login") {
        if (token == null || !window.localStorage.getItem('access')) {
          this.login = true;
        } else if (token != null && window.localStorage.getItem('access') == '1') {
          this.login = false;
          window.location.href = "https://view-back-signalement.herokuapp.com/liste-signalement";
        }
      } else if (url.length > 0 && url.toLowerCase() != "login") {
        if (token != null && window.localStorage.getItem('access') == '1') {
          this.login = false;
        } else {
          this.login = true;
          window.location.href = "https://view-back-signalement.herokuapp.com/";
        }

      }
    })
  }

}


