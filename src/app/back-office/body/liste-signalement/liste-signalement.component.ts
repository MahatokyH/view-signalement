import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Signalement } from 'src/app/models/signalement.model';
import { SignalementService } from 'src/app/service/signalement.service';

@Component({
  selector: 'app-liste-signalement',
  templateUrl: './liste-signalement.component.html',
  styleUrls: ['./liste-signalement.component.css']
})
export class ListeSignalementComponent implements OnInit {


  public signalement: Signalement[] = [];
  public singleSignalement : Signalement = new Signalement();
  public pagination !: Number[]; 

  private signalementSub: Subscription | undefined;

  title =" Les signalements " 
  page: Number =1;
  constructor(private signalementService: SignalementService) { }

  ngOnInit(): void {
    this.signalementService.getPaginationNumber();

    this.signalementSub = this.signalementService.signalements$.subscribe(
      (region: Signalement[]) => { 
        this.signalement = region;
      }
    );
    this.signalementService.getSignalement(this.page);
    if(window.localStorage.getItem("pagination_singalement")!=null) { 
      var taille=Number.parseInt(window.localStorage.getItem("pagination_singalement")+''); 
      this.pagination=Array(taille);
      for (let index = 0; index < taille; index++) {
        this.pagination[index]=index+1;
      }
      console.log(this.pagination);
    } 
  }

  listePage(page : Number) : void {
    this.page=page; 
    this.signalementSub = this.signalementService.signalements$.subscribe(
      (region: Signalement[]) => { 
        this.signalement = region;
      }
    );
    this.signalementService.getSignalement(this.page);
  }

  fiche(n:Signalement) : void {
    this.singleSignalement=n;
  } 

  findSignalement(signalement: Signalement[]) {
    this.signalement=signalement;
  }

  pfindSignalement(pagination: Number) {
    console.log(pagination);
    this.pagination=Array(pagination);
      for (let index = 0; index < pagination; index++) {
        this.pagination[index]=index+1;
      }
  }

}
