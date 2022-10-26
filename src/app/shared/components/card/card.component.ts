import { Component, OnInit, Input } from '@angular/core';
import { IGame, CategoryType } from 'src/app/shared/game';

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
  @Input() jackpot?: number;
  activeCategory?: CategoryType;

  constructor(private store: Store) {
    this.store
      .pipe(select(selectActiveCategory))
      .subscribe((data) => (this.activeCategory = data));
  }

  ngOnInit(): void {}

  isTop(game: IGame) {
    const categories = game.categories;
    if (categories.find((category) => category === CategoryType.top)) return true;
    else return false;
  }

  isNew(game: IGame) {
    const categories = game.categories;
    if (categories.find((category) => category === CategoryType.new)) return true;
    else return false;
  }
}
