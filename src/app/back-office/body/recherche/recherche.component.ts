import { Component, Input, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs'; 
import { RegionService } from 'src/app/service/region.service';
import {} from 'jquery'
import {FormGroup, FormControl} from '@angular/forms';
import { formatDate } from '@angular/common';
import { Signalement } from 'src/app/models/signalement.model';
import { SignalementService } from 'src/app/service/signalement.service';
import { Type } from 'src/app/models/type.model';
import { TypeService } from 'src/app/service/type.service';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})
export class RechercheComponent implements OnInit {

  @Output() newItemEventFind = new EventEmitter<Signalement[]>();
  @Output() newItemEventFindP = new EventEmitter<Number>();

  @Input() pageFocus: any ;

  public types: Type[] = [];

  private typeSub: Subscription | undefined;

  private signalementSub: Subscription | undefined;
  

  public signalement: Signalement[] = [];
  public singleSignalement : Signalement = new Signalement();

  campaignOne: FormGroup; 
  constructor(private typeService: TypeService,private signalementService: SignalementService) {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const date= today.getDate();
   
     
    this.campaignOne = new FormGroup({
      start: new FormControl(new Date(year, month, date)),
      end: new FormControl(new Date(year, month, date+1)),
      type : new FormControl(''),
    });

     
  }

  ngOnInit(): void {   
   this.typeSub = this.typeService.type$.subscribe(
      (type: Type[]) => { 
        this.types = type;
      }
    );
    this.typeService.AllListe(); 
  } 


  nextPage() : void {
    this.show();
  }

  show() : void {
    var start='';
    var end='';
    var type='';
    if(this.campaignOne.value.start!=null) start =(this.campaignOne.value.start.toLocaleDateString().replaceAll("/","-"));
    if(this.campaignOne.value.end!=null) end = (this.campaignOne.value.end.toLocaleDateString().replaceAll("/","-"));
    if(this.campaignOne.value.type!=null) type = (this.campaignOne.value.type); 
    //set pagination
    this.signalementSub = this.signalementService.signalements$.subscribe(
      (region: Signalement[]) => { 
        this.signalement = region;
        this.newItemEventFind.emit(this.signalement);
        this.showPagination();
      }
    );
    this.signalementService.getSignalementWC(1,type,start,end);
  }

  showPagination() : void {
    var page=window.localStorage.getItem("pagination_singalement");
    this.newItemEventFindP.emit(Number.parseInt(page+""));
  }
 
  
}
