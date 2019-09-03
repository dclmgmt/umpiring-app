import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from './environments/environment.prod';
import { Injectable } from '@angular/core';
import { IRegister } from './app/auth/register/register.component';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // apiUrl = 'http://192.168.0.5:5000/api/auth/';
  apiUrl = environment.baseUrl + 'auth/';
  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'login', data)
      .pipe(
        tap(_ => this.log('login')),
        catchError(this.handleError('login', []))
      );
  }

  register(data: any): Observable<any> {

  //     const registerModel: IRegister = {
  //     Email: data.email,
  //     FullName: data.fullName,
  //     Password: data.password,
  //     RoleId: data.roleId
  //  } ;

      return this.http.post<any>(this.apiUrl + 'register', data)
      .pipe(
        tap(_ => this.log('register')),
        catchError(this.handleError('register', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }
}

