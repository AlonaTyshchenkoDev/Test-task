import { IPerson, IChangeBalance, TEventHandler, TDataHandler, THandler, EBankAction } from "./types";

export class EventEmitter {
  events = Object.create(null);

  constructor() {
    this
      .on(EBankAction.Register, (data: IPerson) => {
        console.log(`Пользователь ${data.name} был успешно зарегистрирован`);
      })
      .on(EBankAction.ChangeBalance, ({ name, amount }: IChangeBalance) => {
        console.log(`На счету ${name} — ${amount}$`);
      });
  }

  on(type: string, handler: TEventHandler<THandler>) {
    if (type in this.events) {
      this.events[type].push(handler);
    } else {
      this.events[type] = [handler];
    }
    return this;
  }

  emit(type: string, data: TDataHandler) {
    const handlers = this.events[type];
    if (Array.isArray(handlers)) {
      handlers.forEach((handler) => handler(data));
    }
    return this;
  }
}
