import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Products } from '../../interface';
import { map, catchError, retry, delay } from 'rxjs/operators';
import { Observable, observable, pipe } from 'rxjs';


@Injectable ({
providedIn: 'root'
})

export class ProdutsService {

  public firstCanvasBackroundImage;
   
    constructor (private http: HttpClient) {
      // this.fetch().subscribe(
      //   (res: Products[]) => {
      //     this.firstCanvasBackroundImage = res;          
      //   }
      // )   
    }

    fetch() {
      return this.http.get('/api/product').pipe(        
        )
     
    }

    

}