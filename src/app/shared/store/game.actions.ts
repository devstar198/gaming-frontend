import { createAction, props } from '@ngrx/store';
import { IGame, IGameJackpots, IGameType } from '../game';

export enum GameActionTypes {
  GetAll = 'Get all games',
  LoadGames = 'Load all games',
  GetGameByCategory = 'Get games by category',
  GetJackpots = 'Get all Jackpots',
  LoadJackpots = 'Load Jackpots',
  SetActiveCategory = 'Set active catetory',
  Error = 'Error',
}

export const getGames = createAction(GameActionTypes.GetAll);

export const getGameByCategory = createAction(
  GameActionTypes.GetGameByCategory,
  props<{ gameType: IGameType }>()
);

export const loadGames = createAction(
  GameActionTypes.LoadGames,
  props<{ games: IGame[]; gameType?: IGameType }>()
);

export const getJackpots = createAction(GameActionTypes.GetJackpots);

export const loadJackpots = createAction(
  GameActionTypes.LoadJackpots,
  props<{ jackpots: IGameJackpots[] }>()
);

export const setActiveCategory = createAction(
  GameActionTypes.SetActiveCategory,
  props<{ category: IGameType }>()
);

export const errorGame = createAction(
  GameActionTypes.Error,
  props<{ message: string }>()
);
