import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Signalement } from '../models/signalement.model';
import { UrlService } from './url.service';

@Injectable()
export class SignalementService {


    public signalements$ = new Subject<Signalement[]>();
    private signalements!: Signalement[];

    public vattribution$ = new Subject<boolean>();
    private vattribution!: boolean;

    public response$ = new Subject<boolean>();
    private response!: boolean;

    private url = new UrlService(); 


    constructor(private http: HttpClient) { }

    getSignalement(page: Number): void {
        var token = window.localStorage.getItem("token");
        const  options = { headers: { 'Content-Type': 'application/json', 'Authorization': token } };
        if (token != null) {
            var url = 'https://boiling-sea-05714.herokuapp.com/Signalements?page=' + page;
            this.http.get(url,options).subscribe(
                (response: Signalement[] | any) => {
                    if (response) {
                        this.signalements = response;
                        this.emitSignalement();
                    }
                },
                (error) => {
                    console.log(error);
                }
            );
        }
    }

    getSignalementWC(page: Number | undefined ,type : string | undefined,date1 : string | undefined, date2 : string | undefined): void {
        var token = window.localStorage.getItem("token");
        if (token != null) {
            var data = {
                "page" : page,
                "date1" : date1,                
                "date2" : date2,
                "status":"",
                "type": type
            }
            const  options = { headers: { 'Content-Type': 'application/json', 'Authorization': token } };
            var url = 'https://boiling-sea-05714.herokuapp.com/Signalement?'+this.url.encode(data);
            console.log(url);
            this.http.get(url,options).subscribe(
                (response: Signalement[] | any) => {
                    if (response["list"] && response["pagination"]) {
                        this.signalements = response["list"];
                        window.localStorage.setItem("pagination_singalement", response["pagination"]);
                        this.emitSignalement();
                    }

                },
                (error) => {
                    console.log(error);
                }
            );
        }
    }

    getPaginationNumber(): void {
        var token = window.localStorage.getItem("token");
        const  options = { headers: { 'Content-Type': 'application/json', 'Authorization': token } };
        if (token != null) {
            var url = 'https://boiling-sea-05714.herokuapp.com/Signalements/Pagination';
            this.http.get(url,options).subscribe(
                (response: any) => {
                    if (response["pagination"]) {
                        window.localStorage.setItem("pagination_singalement", response["pagination"]);
                    }
                },
                (error) => {
                    console.log(error);
                }
            );
        }
    }

    attribution(idregion: Number, idsignalement: Number): any {
        if (idregion != null && idsignalement != null && window.localStorage.getItem("token") != null) {
            var data = {
                "signalement": idsignalement,
                "region": idregion,
            }
            console.log(data);
            var token=window.localStorage.getItem("token");
            const options = { headers: { 'Content-Type': 'application/json' , 'Authorization': token } };
            this.http.post('https://boiling-sea-05714.herokuapp.com/Signalement/Attribution', data, options).subscribe(
                (response: any) => {
                    console.log(response);
                    if (response["insert"] == 1) {
                        this.vattribution = true;
                    } else {
                        this.vattribution = false;
                    }
                    this.emitSignalementAttribution();
                },
                (error) => {
                    console.log(error);
                }
            )
        }
    }

    delete(idsignalement: Number): void {
        var token = window.localStorage.getItem("token");
        const  options = { headers: { 'Content-Type': 'application/json', 'Authorization': token } };
        if (token != null) {
            this.http.delete("https://boiling-sea-05714.herokuapp.com/Signalement/"+idsignalement,options).subscribe(
                (response: any) => {
                    console.log(response);
                    if (response["success"] == 1) {
                        this.response = true;
                    } else {
                        this.response = false;
                    }
                    this.emitSignalementResponse();
                },
                (error) => {
                    console.log(error);
                }
            )
        }
    }

    find(data:any) : void {
        var token = window.localStorage.getItem("token");
        const  options = { headers: { 'Content-Type': 'application/json', 'Authorization': token } };
        if (token != null) {
            this.http.get("https://boiling-sea-05714.herokuapp.com/Signalement",options).subscribe(
                (response: Signalement[] | any) => {
                    if (response) {
                        this.signalements = response;
                        this.emitSignalement();
                    }
                },
                (error) => {
                    console.log(error);
                }
            )
        }
    }

    emitSignalement() {
        this.signalements$.next(this.signalements);
    }

    emitSignalementAttribution() {
        this.vattribution$.next(this.vattribution);
    }

    emitSignalementResponse() {
        this.response$.next(this.response);
    }


}