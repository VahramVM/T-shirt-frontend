import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Images } from '../../interface';
import { map, catchError, retry, delay, filter } from 'rxjs/operators';
import { Observable, observable, pipe } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class CategoriesService {

  constructor(private http: HttpClient) { }

  Themes(a) {

    return this.http.get('http://localhost:5000/api/category?name='+ a).pipe(
     
    )
  }

  fetch() {
    return this.http.get('http://localhost:5000/api/category').pipe(

    )
  }


  create(name: string, image?: File): Observable<Images> {
    const fd = new FormData()

    if (image) {
      fd.append('image', image, image.name)
    }
    fd.append('name', name)
    return this.http.post<Images>('/api/category', fd)
  }

  // fetch(): Observable<Category[]> {
  //   return this.http.get<Category[]>('http://localhost:5000/api/category')
  //   .pipe(
  //     map((clients) => clients.map(client => client))
  //   )      
  // }

}