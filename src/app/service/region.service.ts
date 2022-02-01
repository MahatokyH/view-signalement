
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Region } from '../models/region.model';

@Injectable()
export class RegionService { 

    public regions$ = new Subject<Region[]>();
    private regions!: Region[];

    constructor(private http: HttpClient) { } 

    AllListe() : void {

        var token=window.localStorage.getItem("token");
        const  options = { headers: { 'Content-Type': 'application/json', 'authorization': token } };
        this.http.get('https://boiling-sea-05714.herokuapp.com/Signalement/Regions').subscribe(
            (response: Region[] | any ) => { 
                if (response) {
                    this.regions = response;
                    this.emitRegions();
                }
            },
            (error) => {
                console.log(error);
            }
        );
    }

    emitRegions() {
        this.regions$.next(this.regions);
    }
}