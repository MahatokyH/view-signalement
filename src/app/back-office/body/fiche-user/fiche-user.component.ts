import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Region } from 'src/app/models/region.model';
import { User } from 'src/app/models/user.model';
import { RegionService } from 'src/app/service/region.service';

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
    if(this.user.id!=null) {
      this.headerSave='Sauvegarde des changements';
    } else {
      var data = {
        "identifiant": this.form.value.identifiant,
        "region":this.region,
        "password":this.form.value.pwd,
      } 
      this.headerSave="Ajout d'un nouveau utilisateur";
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
