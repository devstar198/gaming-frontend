import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { GameActionTypes, getGames, getJackpots } from './game.actions';
import { of, interval } from 'rxjs';
import { switchMap, catchError, map, mergeMap } from 'rxjs/operators';
import { GameService } from '../service/game.service';
import { TypedAction } from '@ngrx/store/src/models';

@Injectable()
export class GameEffect {
  loadGames$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getGames),
      switchMap((props) => this.loadAllGames(props))
    )
  );

  loadJackpots$ = createEffect(() =>
    interval(3000).pipe(switchMap(() => this.loadAllJackpots()))
  );

  constructor(private actions$: Actions, private gameService: GameService) {}

  private loadAllGames(
    props: {
      gameType?: string | undefined;
    } & TypedAction<GameActionTypes.GetAll>
  ) {
    return this.gameService.getGames().pipe(
      map((games) => ({
        type: GameActionTypes.LoadGames,
        games,
        gameType: props.gameType,
      })),
      catchError((error) => of({ type: GameActionTypes.Error, message: error }))
    );
  }

  private loadAllJackpots() {
    return this.gameService.getJackpots().pipe(
      map((jackpots) => ({
        type: GameActionTypes.LoadJackpots,
        jackpots,
      })),
      catchError((error) => of({ type: GameActionTypes.Error, message: error }))
    );
  }
}
