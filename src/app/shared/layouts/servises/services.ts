import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../interface';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'


@Injectable({
    providedIn: 'root'
})

export class AuthServices {

    private token = null

    constructor(private http: HttpClient) { }


    sendEmail(url, data) {
        return this.http.post(url, data).subscribe(
            data => {
                let res:any = data;
                console.log('scssessfuli');
                
            }
        );
    };

    data() {
        return this.http.get('api/category').pipe(        
        )   
    }


    register(user: User): Observable<User> {
        return this.http.post<User>('/api/auth/register', user)
    }

    login(user: User): Observable<{ token: string }> {
        return this.http.post<{ token: string }>('/api/auth/login', user).
            pipe(
                tap(
                    ({ token }) => {
                        localStorage.setItem('auth-token', token)
                        this.setToken(token)
                    }
                )
            )
    }
    setToken(token: string) {
        this.token = token
    }

    getToken(): string {
        return this.token
    }

    isAuthenticaded(): boolean {
        return !!this.token
    }

    logout() {
        this.setToken(null)
        localStorage.clear()
    }
}