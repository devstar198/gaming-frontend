import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IGame, IGameType, IMenu, Menus } from 'src/app/shared/game';

import { Store, select } from '@ngrx/store';
import { selectActiveCategory } from 'src/app/shared/store/game.reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  menus: IMenu[] = Menus;
  activeCategory?: IGameType;

  constructor(private router: Router, private store: Store) {
    this.store
      .pipe(select(selectActiveCategory))
      .subscribe((data) => (this.activeCategory = data));
  }

  ngOnInit(): void {}

  goToGame(menu: IMenu) {
    this.router.navigate([`/game/${menu.type}`]);
  }
}
