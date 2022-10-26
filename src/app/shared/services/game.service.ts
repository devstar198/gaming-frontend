import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { IGame, IJackpot } from '../game';

@Injectable()
export class GameService {
  constructor(private http: HttpClient) {}

  getGames() {
    return this.http
      .get<IGame[]>("http://stage.whgstage.com/front-end-test/games.php")
      .pipe(catchError(this.handleError));
  }

  getJackpots() {
    return this.http
      .get<IJackpot[]>("http://stage.whgstage.com/front-end-test/jackpots.php")
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
