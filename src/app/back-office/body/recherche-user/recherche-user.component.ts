import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Region } from 'src/app/models/region.model';
import { User } from 'src/app/models/user.model';
import { RegionService } from 'src/app/service/region.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-recherche-user',
  templateUrl: './recherche-user.component.html',
  styleUrls: ['./recherche-user.component.css']
})
export class RechercheUserComponent implements OnInit {

  @Output() newItemEventFind = new EventEmitter<User[]>();
  public regions: Region[] = [];
  private regionSub: Subscription | undefined;
  public users: User[] = []; 
  private usersSub: Subscription | undefined; 

  campaignOne: FormGroup; 
  constructor(private regionService: RegionService,private usersService: UserService) { 
    this.campaignOne = new FormGroup({
      region : new FormControl(''),
      identifiant : new FormControl('')
    });

  }

  ngOnInit(): void {
    this.regionSub = this.regionService.regions$.subscribe(
      (region: Region[]) => { 
        this.regions = region;
      }
    );
    this.regionService.AllListe();
    
  } 

  show() : void {
    var region='';
    var identifiant='';
    if(this.campaignOne.value.region!=null)region=this.campaignOne.value.region;
    if(this.campaignOne.value.identifiant!=null)identifiant=this.campaignOne.value.identifiant; 

    var data = {
      "region": region,
      "identifiant":identifiant
    };

    this.usersSub = this.usersService.user$.subscribe(
      (users: User[]) => { 
        this.users = users;
        this.newItemEventFind.emit(this.users);
      }
    );
    this.usersService.find(data);
  }

}
