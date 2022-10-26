import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryType, ICategory } from 'src/app/shared/game';

import { Store, select } from '@ngrx/store';
import { selectActiveCategory } from 'src/app/shared/store/game.reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  categories: ICategory[]  = [
    {
      type: CategoryType.top,
      name: 'Top Games',
    },
    {
      type: CategoryType.new,
      name: 'New Games',
    },
    {
      type: CategoryType.slots,
      name: 'Slots',
    },
    {
      type: CategoryType.jackpots,
      name: 'Jackpots',
    },
    {
      type: CategoryType.live,
      name: 'Live',
    },
    {
      type: CategoryType.blackjack,
      name: 'Blackjack',
    },
    {
      type: CategoryType.roulette,
      name: 'Roulette',
    },
    {
      type: CategoryType.table,
      name: 'Table',
    },
    {
      type: CategoryType.poker,
      name: 'Poker',
    },
    {
      type: CategoryType.other,
      name: 'Other',
    },
  ];
  activeCategory?: CategoryType;

  constructor(private router: Router, private store: Store) {
    this.store
      .pipe(select(selectActiveCategory))
      .subscribe((data) => (this.activeCategory = data));
  }

  ngOnInit(): void {}

  goToSelectedCategory(category: ICategory) {
    this.router.navigate([`/category/${category.type}`]);
  }
}
