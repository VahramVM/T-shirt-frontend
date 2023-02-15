import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Products } from '../../interface';
import { map, catchError, retry, delay } from 'rxjs/operators';
import { Observable, observable, pipe } from 'rxjs';


@Injectable ({
providedIn: 'root'
})

export class ProdutsColorService {
   
    constructor (private http: HttpClient) {}

    fetch() {
      return this.http.get('/api/productcolor').pipe(        
        )   
     
    }
}