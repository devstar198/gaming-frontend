import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { getGames, getJackpots, setActiveCategory } from 'src/app/shared/store/game.actions';
import { selectGames, selectJackpots } from 'src/app/shared/store/game.reducers';

import { IGame, IJackpot, CategoryType } from 'src/app/shared/game';
import { GameService } from 'src/app/shared/services/game.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent implements OnInit {
  allGames: IGame[] = [];
  games?: IGame[];
  categoryType: string = '';
  jackpots: IJackpot[] = [];

  constructor(
    private store: Store,
    public gameService: GameService,
    private route: ActivatedRoute
  ) {
    this.store
      .pipe(select(selectGames))
      .subscribe((data) => this.allGames = data);

    this.store
      .pipe(select(selectJackpots))
      .subscribe((data) => this.jackpots = data);

    this.store.dispatch(getGames());

    this.store.dispatch(getJackpots());

    this.route.params.subscribe((params) => {
      this.categoryType = params['type'];
      this.store.dispatch(setActiveCategory({ category: params['type'] }));
    });
  }

  ngOnInit(): void {}

  getGamesByCategory(type: string) {
    const games = this.allGames;
    let arr: IGame[] = [];

    if (!this.categoryType) {
      arr = games;
    } else {
      if (type === CategoryType.jackpots) {
        const jackpots = this.jackpots;
        arr = games.filter((game) => {
          if (jackpots.find((jackpot) => jackpot.game === game.id)) return true;
          else return false;
        });
      } else {
        if (type === CategoryType.other) {
          arr = games.filter((game) =>
            game.categories.find(
              (category) =>
                category === CategoryType.ball ||
                category === CategoryType.virtual ||
                category === CategoryType.fun
            )
          );
        } else if (type === CategoryType.jackpots) {
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
