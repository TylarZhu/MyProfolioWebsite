import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

import { User } from "./user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  addUser = (user: User): Observable<User> => {
    return this.http.post<User>('/user/', user, this.httpOptions).pipe(
      tap(_ => console.log('add user')),
      catchError(this.handleError<any>('add user'))
    );
  }

  getUsers = (): Observable<User[]> => {
    return this.http.get<User[]>('/users/').pipe(
      tap(_ => console.log('fetched users')),
      catchError(this.handleError<User[]>('get users'))
    );
  }

  addLikes = (user: User): Observable<User[]> => {
    return this.http.post<User[]>('/likes/', user, this.httpOptions).pipe(
      tap(_ => console.log('add like')),
      catchError(this.handleError<any>('add like'))
    );
  }
  addUnlikes = (user: User): Observable<User[]> => {
    return this.http.post<User[]>('/unlikes/', user, this.httpOptions).pipe(
      tap(_ => console.log('add like')),
      catchError(this.handleError<any>('add like'))
    );
  }

  private handleError = <T>(operation = 'operation', result?: T): (error: any) => Observable<T> => {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
