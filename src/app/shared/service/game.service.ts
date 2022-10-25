import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';

import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { IGame, IGameJackpots } from '../game';

@Injectable()
export class GameService {
  private url: string = 'http://stage.whgstage.com/front-end-test';

  constructor(private http: HttpClient) {}

  getGames() {
    return this.http
      .get<IGame[]>(`${this.url}/games.php`)
      .pipe(catchError(this.handleError));
  }

  getJackpots() {
    return this.http
      .get<IGameJackpots[]>(`${this.url}/jackpots.php`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
