export interface IGame {
  categories: string[];
  name: string;
  image: string;
  id: string;
}

export interface IJackpot {
  game: string;
  amount: number;
}

export enum CategoryType {
  top = 'top',
  new = 'new',
  slots = 'slots',
  jackpots = 'jackpots',
  live = 'live',
  blackjack = 'blackjack',
  roulette = 'roulette',
  table = 'table',
  poker = 'poker',
  other = 'other',
  ball = 'ball',
  virtual = 'virtual',
  fun = 'fun',
}

export type ICategory = {
  type: CategoryType;
  name: string;
};
