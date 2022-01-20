import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-liste-user',
  templateUrl: './liste-user.component.html',
  styleUrls: ['./liste-user.component.css']
})
export class ListeUserComponent implements OnInit {


  title =" Les Utilisateur ";
  page: Number =1;
  
  public users: User[] = []; 
  public singleUser : User = new User();
  private usersSub: Subscription | undefined; 
  public pagination !: Number[];

  
  constructor(private usersService: UserService) { }

  ngOnInit(): void {
    this.usersService.getPaginationNumber();
    this.usersSub = this.usersService.user$.subscribe(
      (users: User[]) => { 
        this.users = users;
      }
    );
    this.usersService.AllListe(this.page);
    if(window.localStorage.getItem("pagination_user")!=null) { 
      var taille=Number.parseInt(window.localStorage.getItem("pagination_user")+''); 
      this.pagination=Array(taille);
      for (let index = 0; index < taille; index++) {
        this.pagination[index]=index+1;
      }
      console.log(this.pagination);
    } 

  }

  listePage(page : Number) : void {
    this.page=page; 
    this.usersSub = this.usersService.user$.subscribe(
      (users: User[]) => { 
        this.users = users;
      }
    );
    this.usersService.AllListe(this.page);
  }

  fiche(n:User) : void {
    this.singleUser=n;
  }

  newfiche() : void {
    this.singleUser=new User();
  }

  findUser(signalement: User[]) {
    this.users=signalement;
  }
  
}
