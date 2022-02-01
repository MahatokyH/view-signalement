import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http'; 
import { Type } from '../models/type.model';

@Injectable()
export class TypeService { 

    public type$ = new Subject<Type[]>();
    private type!: Type[];

    constructor(private http: HttpClient) { } 

    AllListe() : void {
        var token: string = String(window.localStorage.getItem("token")) ;
        const  options = { headers: { 'Content-Type': 'application/json', 'Authorization': token } };
        this.http.get('https://boiling-sea-05714.herokuapp.com/TypeDeSignalement',options).subscribe(
            (response: Type[] | any ) => { 
                if (response) {
                    console.log(response);
                    this.type = response;
                    this.emitType();
                }
            },
            (error) => {
                console.log(error);
            }
        );
    }

    emitType() {
        this.type$.next(this.type);
    }
}