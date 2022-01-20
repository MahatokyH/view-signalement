
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { UrlService } from './url.service';

@Injectable()
export class UserService {


    public user$ = new Subject<User[]>();
    private user!: User[];

    public response$ = new Subject<boolean>();
    private response!: boolean;
    private url = new UrlService(); 

    constructor(private http: HttpClient) { } 

    connexion(donne: any): void {
        const  options = { headers: { 'Content-Type': 'application/json' } };
        if (donne != null) {
            this.http.post('https://boiling-sea-05714.herokuapp.com/User/Login/Admin', donne,options).subscribe((valuer: any) => { 
                try {
                    if ( valuer["token"] != null) {
                        window.localStorage.setItem("token", valuer["token"]);
                        window.location.href = " https://view-back-signalement.herokuapp.com/liste-signalement"; 
                    }
                } catch (error) {
                    window.location.href = " https://view-back-signalement.herokuapp.com/login"; 
                }
            });
        } else {
            return;
        }

    } 
    testToken(token: string | null): void {
        const  options = { headers: { 'Content-Type': 'application/json' } };
        if (token != null) {
            this.http.get('https://boiling-sea-05714.herokuapp.com/Token?token=' + token,options).subscribe(
                (value: any) => { 
                    if (value["access"] == true) {
                        this.response = true;  
                        if(window.localStorage.getItem('access')==null || window.localStorage.getItem('access')!='1') {
                            window.localStorage.setItem("access",'1');
                            window.location.reload();
                        }
                       
                    } else {
                        this.response = false;
                        window.localStorage.removeItem("token");
                        window.localStorage.removeItem("access");
                    }
                    this.emitSignalementResponse(); 
            })
        }  
    }

    AllListe(page : Number ) : void{
        var token=window.localStorage.getItem("token");
        if(token!=null) {
            this.http.get('https://boiling-sea-05714.herokuapp.com/UserRegion/WOC?page='+page+'&token='+token).subscribe(
                (response:any) => {
                    if(response["success"]==true) {
                        this.user=response["list"];
                        this.emitUser();
                    } 
                },
                (error) => {
                    console.log(error);
                } 
            )
        } 
    } 

    update(data:any) {
        const  options = { headers: { 'Content-Type': 'application/json' } };
        var token = window.localStorage.getItem("token");
        if(token!=null) {
            this.http.put("https://boiling-sea-05714.herokuapp.com/UserRegion",data,options).subscribe((response:any)=>{
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

    add(data:any) {
        const  options = { headers: { 'Content-Type': 'application/json' } };
        var token = window.localStorage.getItem("token");
        if(token!=null) {
            this.http.post("https://boiling-sea-05714.herokuapp.com/User/Add",data,options).subscribe((response:any)=>{
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

    delete(id:Number) {
        const  options = { headers: { 'Content-Type': 'application/json' } };
        var token = window.localStorage.getItem("token");
        if(token!=null) {
            this.http.delete("https://boiling-sea-05714.herokuapp.com/UserRegion/"+id+"token="+token).subscribe((response:any)=>{
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

    find(data:any) { 
        var token = window.localStorage.getItem("token");
        if(token!=null) {
            this.http.get("https://boiling-sea-05714.herokuapp.com/UserRegion"+this.url.encode(data)).subscribe((response:any)=>{
                if(response["success"]==true) {
                    this.user=response["list"];
                    this.emitUser();
                }
            },
            (error) => {
                console.log(error);
            } 
            )
        }
    }

    getPaginationNumber(): void {
        var token = window.localStorage.getItem("token");
        var url = 'https://boiling-sea-05714.herokuapp.com/UserRegion/WOC/Pagination?token=' + token;
        this.http.get(url).subscribe(
            (response: any) => {
                if (response["pagination"]) {
                    window.localStorage.setItem("pagination_user", response["pagination"]);
                }
            },
            (error) => {
                console.log(error);
            }
        );
    }

    emitUser() {
        this.user$.next(this.user);
    }

    emitSignalementResponse() {
        this.response$.next(this.response);
    }

}