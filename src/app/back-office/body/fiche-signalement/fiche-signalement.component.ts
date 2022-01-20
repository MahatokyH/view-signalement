import { Component, Input, NgModule, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Region } from 'src/app/models/region.model';
import { Signalement } from 'src/app/models/signalement.model';
import { RegionService } from 'src/app/service/region.service';
import { SignalementService } from 'src/app/service/signalement.service'; 
import {} from 'jquery'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-fiche-signalement',
  templateUrl: './fiche-signalement.component.html',
  styleUrls: ['./fiche-signalement.component.css']
})
export class FicheSignalementComponent implements OnInit {

  @Input() signalement !: Signalement;
  

  public region !: any; 

  public regions: Region[] = [];

  private regionSub: Subscription | undefined; 

  public response: any ;
  public viwResponse : any;

  private signalementSub: Subscription | undefined;

  constructor(private regionService: RegionService,private signalementService: SignalementService,private router: Router, private activatedRoute: ActivatedRoute){ }

  ngOnInit(): void {
    this.regionSub = this.regionService.regions$.subscribe(
      (region: Region[]) => { 
        this.regions = region;
      }
    );
    this.regionService.AllListe();
    
  } 

  onChange(newValue: any) { 
    
    this.region = newValue.target.value;   
     
  }
  
  save():void { 
     
    this.signalementSub = this.signalementService.vattribution$.subscribe(
      (region: any) => {  
        this.response = region;
        if(this.response==true) {
          this.viwResponse='Attribution faite sans erreur'; 
        }  else {
          this.viwResponse='Erreur recontre lors de l\'attribution ';
        }
      }
    );
    this.signalementService.attribution(this.region,this.signalement.id!);
     
  }

  reload() {
    this.router.navigate([this.router.url]);
  }


}
