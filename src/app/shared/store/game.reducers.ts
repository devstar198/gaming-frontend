import { createReducer, on, createSelector } from '@ngrx/store';
import {
  errorGame,
  loadGames,
  loadJackpots,
  setActiveCategory,
} from './game.actions';
import { IGame, IJackpot, CategoryType } from '../game';

export interface GameState {
  games: IGame[];
  jackpots: IJackpot[];
  filteredGames?: IGame[];
  activeCategory?: CategoryType;
  error: string;
}

export const initialState: GameState = {
  games: [],
  jackpots: [],
  filteredGames: [],
  error: '',
};

export const GameReducer = createReducer(
  initialState,
  on(setActiveCategory, (state, action) => ({
    ...state,
    activeCategory: action.category,
  })),
  on(loadGames, (state, action) => ({ ...state, games: action.games })),
  on(loadJackpots, (state, action) => ({
    ...state,
    jackpots: action.jackpots,
  })),
  on(errorGame, (state, action) => ({
    ...state,
    error: action.message,
  }))
);

export const selectGameState = (state: any) => state.gameState;
export const selectGames = createSelector(
  selectGameState,
  (state) => state.games
);

export const selectGamesByCategory = createSelector(
  selectGameState,
  (state) => state.filteredGames
);

export const selectJackpots = createSelector(
  selectGameState,
  (state) => state.jackpots
);

export const selectActiveCategory = createSelector(
  selectGameState,
  (state) => state.activeCategory
);

export const selectError = createSelector(
  selectGameState,
  (state) => state.error
);
