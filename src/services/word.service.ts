import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class WordService {
  constructor(private http: HttpClient) { }
  path = 'http://localhost:5000/word/';

  GetCount(): Observable<any> {
    return this.http.get<any>(this.path + "GetCount").pipe(catchError(this.handleError));
  }

  Get(skip: number, take: number): Observable<any> {
    return this.http.get<any>(this.path + "Get/" + skip + "/" + take).pipe(catchError(this.handleError));
  }

  GetRandomWord(): Observable<any> {
    return this.http.get<any>(this.path + "GetRandomWord").pipe(catchError(this.handleError));
  }

  Control(object: any): Observable<any> {
    return this.http.post<any>(this.path + "Control",object).pipe(catchError(this.handleError));
  }

  Push(object: any) {
    return this.http.post<any>(this.path + "Add", object).pipe(catchError(this.handleError));
  }

  handleError(err: HttpErrorResponse) {
    if (err.error instanceof ErrorEvent) {
      return throwError(
        'İdari İşler Servisinde bir hata oluştu ' + err.error.message
      );
    } else {
      return throwError('İdari İşler Servisinde Sistemsel bir hata ');
    }
  }
}
