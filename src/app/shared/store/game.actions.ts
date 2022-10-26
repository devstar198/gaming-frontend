import { createAction, props } from '@ngrx/store';
import { IGame, IJackpot, CategoryType } from '../game';

export enum ActionType {
  GetAll = 'Get all games',
  LoadGames = 'Load all games',
  GetGameByCategory = 'Get games by category',
  GetJackpots = 'Get all Jackpots',
  LoadJackpots = 'Load Jackpots',
  SetActiveCategory = 'Set active catetory',
  Error = 'Error',
}

export const getGames = createAction(ActionType.GetAll);

export const getGameByCategory = createAction(
  ActionType.GetGameByCategory,
  props<{ gameType: CategoryType }>()
);

export const loadGames = createAction(
  ActionType.LoadGames,
  props<{ games: IGame[]; gameType?: CategoryType }>()
);

export const getJackpots = createAction(ActionType.GetJackpots);

export const loadJackpots = createAction(
  ActionType.LoadJackpots,
  props<{ jackpots: IJackpot[] }>()
);

export const setActiveCategory = createAction(
  ActionType.SetActiveCategory,
  props<{ category: CategoryType }>()
);

export const errorGame = createAction(
  ActionType.Error,
  props<{ message: string }>()
);
