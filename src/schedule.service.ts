import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Schedule } from './app/schedule/schedule';
import { environment } from './environments/environment.prod';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Assigment } from './app/shared/assignment';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {


  // apiUrl = 'http://192.168.0.5:5000/api/Book';
  apiUrl = environment.baseUrl + 'Schedule';


  constructor(private http: HttpClient) { }

  getSchedule(): Observable<Assigment[]> {
    this.apiUrl = environment.baseUrl + 'Schedule';
    return this.http.get<Assigment[]>(this.apiUrl)
      .pipe(
        tap(_ => this.log('fetched Schedule')),
        catchError(this.handleError('getSchedule', []))
      );
  }
  getTeams(): Observable<Assigment[]> {
    this.apiUrl = environment.baseUrl + 'Schedule' + '/getTeamNames';
    return this.http.get<Assigment[]>(this.apiUrl)
      .pipe(
        tap(_ => this.log('fetched Schedule')),
        catchError(this.handleError('getSchedule', []))
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
