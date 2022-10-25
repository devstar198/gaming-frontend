import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store, select } from '@ngrx/store';
import {
  getGameByCategory,
  getGames,
  getJackpots,
  setActiveCategory,
} from 'src/app/shared/store/game.actions';
import {
  selectGames,
  selectGamesByCategory,
  selectJackpots,
} from 'src/app/shared/store/game.reducers';

import { IGame, IGameJackpots, IGameType } from 'src/app/shared/game';
import { GameService } from 'src/app/shared/service/game.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  allGames: IGame[] = [];
  games?: IGame[];
  gameType: string = '';
  jackpotsTimer: any;
  jackpots: IGameJackpots[] = [];

  constructor(
    public gameService: GameService,
    private route: ActivatedRoute,
    private store: Store
  ) {
    this.store.pipe(select(selectGames)).subscribe((data) => {
      this.allGames = data;
    });

    this.store
      .pipe(select(selectJackpots))
      .subscribe((data) => (this.jackpots = data));

    this.store.dispatch(getGames());

    this.store.dispatch(getJackpots());

    this.route.params.subscribe((params) => {
      this.gameType = params['game'];
      this.store.dispatch(setActiveCategory({ category: params['game'] }));
    });
  }

  ngOnInit(): void {}

  filteredGames(type: string) {
    const games = this.allGames;
    let arr: IGame[] = [];

    if (!this.gameType) {
      arr = games;
    } else {
      if (type === IGameType.jack) {
        const jackpots = this.jackpots;
        arr = games.filter((game) => {
          if (jackpots.find((jackpot) => jackpot.game === game.id)) return true;
          else return false;
        });
      } else {
        if (type === IGameType.other) {
          arr = games.filter((game) =>
            game.categories.find(
              (category) =>
                category === IGameType.ball ||
                category === IGameType.virtual ||
                category === IGameType.fun
            )
          );
        } else if (type === IGameType.jack) {
        } else {
          arr = games.filter((game) =>
            game.categories.find((category) => category === type)
          );
        }
      }
    }

    return arr;
  }

  getGameJackpot(id: string) {
    const jackpot = this.jackpots.find((game) => game.game === id);
    return jackpot?.amount;
  }
}
