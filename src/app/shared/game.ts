export interface IGame {
  id: string;
  image: string;
  name: string;
  categories: string[];
}

export interface IGameJackpots {
  game: string;
  amount: string;
}

export enum IGameType {
  top = 'top',
  new = 'new',
  slots = 'slots',
  jack = 'jack',
  poker = 'poker',
  table = 'table',
  live = 'live',
  blackjack = 'blackjack',
  roulette = 'roulette',
  ball = 'ball',
  fun = 'fun',
  virtual = 'virtual',
  other = 'other',
}

export type IMenu = {
  type: IGameType;
  menu: string;
};

export const Menus: IMenu[] = [
  {
    type: IGameType.top,
    menu: 'Top Games',
  },
  {
    type: IGameType.new,
    menu: 'New Games',
  },
  {
    type: IGameType.slots,
    menu: 'Slots',
  },
  {
    type: IGameType.jack,
    menu: 'Jackpots',
  },
  {
    type: IGameType.live,
    menu: 'Live',
  },
  {
    type: IGameType.blackjack,
    menu: 'BlackJack',
  },
  {
    type: IGameType.roulette,
    menu: 'Roulette',
  },
  {
    type: IGameType.table,
    menu: 'Table',
  },
  {
    type: IGameType.poker,
    menu: 'Poker',
  },
  {
    type: IGameType.other,
    menu: 'Other',
  },
];
