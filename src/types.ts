export interface IPerson {
  name: string,
  balance: number
}

export interface IEventData {
  personId: number,
  amount: number
}

export interface IChangeBalance {
  name: string,
  amount: number
}

export interface IBankData {
  [id: number]: IPerson
}

export enum EBankAction {
  Register = 'register',
  Add = 'add',
  ChangeBalance = 'changeBalance',
  Withdraw = 'withdraw'
}

export interface IEventData {
  personId: number,
  amount: number
}

export interface IChangeBalance {
  name: string,
  amount: number
}

export type TDataHandler = IPerson | IEventData | IChangeBalance;
export type THandler = keyof TDataHandler;
export type TEventHandler<T> = (data: T) => void;