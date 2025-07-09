import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { inject } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';

export abstract class BaseService<T> {
  protected httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  protected serverBaseUrl: string = `${environment.serverBaseUrl}`;
  protected abstract resourceEndpoint: string;
  protected http: HttpClient = inject(HttpClient);

  protected handleError(error: HttpErrorResponse) {
    let errorMessage = 'Something bad happened; please try again later.';

    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
      errorMessage = error.error.message;
    } else {
      console.error(`Backend returned code ${error.status}, body was:`, error.error);

      switch (error.status) {
        case 400:
          errorMessage = 'Bad request. Please check your input.';
          break;
        case 401:
          errorMessage = 'Unauthorized. Please log in again.';
          localStorage.clear();
          break;
        case 403:
          errorMessage = 'Forbidden. You don\'t have permission for this action.';
          break;
        case 404:
          errorMessage = 'Resource not found.';
          break;
        case 500:
          errorMessage = 'Internal server error. Please try again later.';
          break;
        default:
          errorMessage = `Unexpected error (${error.status}). Please try again.`;
      }
    }

    return throwError(() => new Error(errorMessage));
  }

  protected resourcePath(): string {
    return `${this.serverBaseUrl}${this.resourceEndpoint}`;
  }

  // Helper method for authentication headers (PROTECTED, not private)
  protected getAuthHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // Basic CRUD operations
  public create(resource: T): Observable<T> {
    return this.http.post<T>(this.resourcePath(), JSON.stringify(resource), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  public delete(id: any): Observable<any> {
    return this.http.delete(`${this.resourcePath()}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  public update(id: any, resource: T): Observable<T> {
    return this.http.put<T>(`${this.resourcePath()}/${id}`, JSON.stringify(resource), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  public getAll(): Observable<Array<T>> {
    return this.http.get<Array<T>>(this.resourcePath(), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  public getById(id: any): Observable<T> {
    return this.http.get<T>(`${this.resourcePath()}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
