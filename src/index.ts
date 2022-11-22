// Для запуска файла использовать команду ts-node src/index.ts находясь в папке homeworks/2
import { EventEmitter } from './emitter';
import { EBankAction, IBankData, IEventData, IPerson } from './types';

class Bank extends EventEmitter {
  persons: IBankData = {};

  constructor() {
    super();
    this.on(EBankAction.Add, (data: IEventData) => this.add(data));
    this.on(EBankAction.Withdraw, (data: IEventData) => this.withdraw(data));
  }

  register(person: IPerson) {
    const id = Date.now();
    this.persons[id] = {...person};
    this.emit(EBankAction.Register, person);
    return id;
  }

  add(data: IEventData) {
    const {personId, amount} = data;
    const person = this.persons[personId];
    if (!person) throw new Error(`Пользователь с идентификатором ${personId} не найден`);
    person.balance = person.balance + amount;
    this.emit(EBankAction.ChangeBalance, {name: person.name, amount: person.balance});
  }

  withdraw(data: IEventData) {
    const {personId, amount} = data;
    const person = this.persons[personId];
    if (!person) throw new Error(`Пользователь с идентификатором ${personId} не найден`);
    const diff = person.balance - amount;
    if (diff < 0) throw new Error(`На балансе пользователя с идентификатором ${personId} не достаточно средств для исполнения операции`);
    person.balance = diff;
    this.emit(EBankAction.ChangeBalance, {name: person.name, amount: person.balance});
  }
}

const bank = new Bank();
const personId = bank.register({
  name: 'Джон Доу',
  balance: 100
});

bank.emit(EBankAction.Add, {personId, amount: 20});

// Задание со звёздочкой
bank.emit(EBankAction.Withdraw, {personId, amount: 20});
