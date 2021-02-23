import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WordService {
  constructor(private http: HttpClient) {}
  path = 'http://localhost:3000/words';

  Get(): Observable<any> {
    return this.http.get(this.path).pipe(catchError(this.handleError));
  }

  Push(object: any) {
    return this.http.post<any>(this.path, object).pipe(catchError(this.handleError));
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
