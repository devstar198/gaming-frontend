import { Component, OnInit, Input } from '@angular/core';
import { IGame, IGameType } from 'src/app/shared/game';

import { Store, select } from '@ngrx/store';
import {
  selectActiveCategory,
  selectGames,
} from 'src/app/shared/store/game.reducers';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() game?: IGame;
  @Input() jackpot?: string;
  activeCategory?: IGameType;

  constructor(private store: Store) {
    this.store
      .pipe(select(selectActiveCategory))
      .subscribe((data) => (this.activeCategory = data));
  }

  ngOnInit(): void {}

  isNewRibbon(game: IGame) {
    if (
      this.activeCategory === IGameType.new ||
      this.activeCategory === IGameType.top
    )
      return;
    const categories = game.categories;
    if (categories.find((category) => category === IGameType.new)) return true;
    else return false;
  }

  isTopRibbon(game: IGame) {
    if (
      this.activeCategory === IGameType.new ||
      this.activeCategory === IGameType.top
    )
      return;
    const categories = game.categories;
    if (categories.find((category) => category === IGameType.top)) return true;
    else return false;
  }
}
