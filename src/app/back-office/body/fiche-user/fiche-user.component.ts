import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Region } from 'src/app/models/region.model';
import { User } from 'src/app/models/user.model';
import { RegionService } from 'src/app/service/region.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-fiche-user',
  templateUrl: './fiche-user.component.html',
  styleUrls: ['./fiche-user.component.css']
})
export class FicheUserComponent implements OnInit {

  @Input() user !: User;

  public region !: any; 

  public regions: Region[] = [];

  private regionSub: Subscription | undefined; 

  public headerSave='';
  public viwResponse : any; 
  form!: FormGroup;


  submitted = false; 


  constructor(private formBuilder: FormBuilder,
              private regionService: RegionService,
              private userService: UserService,
              private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void { 
      this.form = this.formBuilder.group({
        identifiant: ['', Validators.required],
        pwd: ['', Validators.required,],
      }
      ); 
      console.log(this.form.value); 
      this.regionSub = this.regionService.regions$.subscribe(
        (region: Region[]) => { 
          this.regions = region;
        }
      );
      this.regionService.AllListe(); 
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if(changes.user!=null) {
      this.form.controls.identifiant.setValue(changes.user.currentValue.identifiant);
    }
    console.log(changes.user); 
  }

  onChange(newValue: any) {  
    this.region = newValue.target.value;   
  }

  onSubmit():void { 
    this.submitted=true;
    if (this.form.invalid) { 
      return;
    } 
    var data;
    if(this.user.id!=null) {
      data = {
        "identifiant": this.form.value.identifiant,
        "id": this.user.id,
        "region":this.region,
        "mdp":this.form.value.pwd,
        "token":window.localStorage.getItem("token")
      } 
      this.userService.response$.subscribe((response)=>{
          if(response==true) {
            this.headerSave='Sauvegarde des changements';
          }
      })
      this.userService.update(data); 
      
    } else {
      data = {
        "identifiant": this.form.value.identifiant,
        "region":this.region,
        "mdp":this.form.value.pwd,
        "token":window.localStorage.getItem("token")
      } 
      console.log(data);
      this.userService.response$.subscribe((response)=>{
          if(response==true) {
            this.headerSave="Ajout d'un nouveau utilisateur";
          }
      })
      this.userService.add(data); 
    }

  }

  reset():void {
    this.form.reset();
  }

  reload():void {
    this.router.navigate([this.router.url]);
  }

  get f(): { [key: string]: AbstractControl } { 
    return this.form.controls;
  }

}
