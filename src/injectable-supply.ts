/// <reference path="lib/injectable-supply.d.ts" />
import { Observable } from 'rxjs/Rx';

export class InjectableSupply {

  private cache : Supply<Observable<Injectable>> = {};

  inject(symbol : string) : Observable<Injectable> {
    return this.cache[symbol];
  }

  supply(symbol : string, injectable : Observable<Injectable> | Promise<Injectable> | Injectable) : void {
    if (symbol in this.cache) {
      console.error(`duplicate supply ${symbol}`);
      return;
    }
    if (injectable instanceof Observable) {
      this.cache[symbol] = <Observable<Injectable>>injectable;
      return;
    }
    this.cache[symbol] = Observable.fromPromise(Promise.resolve(injectable));
  }

}
