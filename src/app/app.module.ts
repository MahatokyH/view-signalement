import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './back-office/header/header.component';
import { FooterComponent } from './back-office/footer/footer.component';
import { ListeSignalementComponent } from './back-office/body/liste-signalement/liste-signalement.component';
import { StatistiqueComponent } from './back-office/body/statistique/statistique.component';
import { ListeUserComponent } from './back-office/body/liste-user/liste-user.component';
import { ListeRegionComponent } from './back-office/body/liste-region/liste-region.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { RechercheComponent } from './back-office/body/recherche/recherche.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './service/user.service'
import { HttpClientModule } from '@angular/common/http';
import { RegionService } from './service/region.service';
import { SignalementService } from './service/signalement.service';
import { FicheSignalementComponent } from './back-office/body/fiche-signalement/fiche-signalement.component';
import { MapComponent } from './map/map.component';
import { RechercheUserComponent } from './back-office/body/recherche-user/recherche-user.component';
import { FicheUserComponent } from './back-office/body/fiche-user/fiche-user.component';
import {MaterialExampleModule} from '../material.module';
import {MatNativeDateModule} from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { TypeService } from './service/type.service';
 

const appRoutes: Routes = [
  { path: "", component: LoginComponent },
  { path: "login", component: LoginComponent },
  { path: "liste-signalement", component: ListeSignalementComponent },
  { path: "liste-user", component: ListeUserComponent },
  { path: "liste-region", component: ListeRegionComponent },
  { path: 'statistique', component: StatistiqueComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ListeSignalementComponent,
    StatistiqueComponent,
    ListeUserComponent,
    ListeRegionComponent,
    LoginComponent,
    RechercheComponent,
    FicheSignalementComponent,
    MapComponent,
    RechercheUserComponent,
    FicheUserComponent
  ],
  imports: [ 
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule, 
    FormsModule, 
    HttpClientModule,
    ReactiveFormsModule, 
    MaterialExampleModule,
    MatNativeDateModule, 
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    UserService,
    RegionService,
    SignalementService,
    TypeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
