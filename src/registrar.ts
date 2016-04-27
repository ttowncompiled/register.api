/// <reference path="lib/registrar.d.ts" />
import { Observable } from 'rxjs/Rx';
import { InjectableSupply } from './injectable-supply';
import { ModuleCache } from './module-cache';

export class Registrar {

  constructor(private icache : InjectableSupply, private mcache : ModuleCache) {}

  import(name : string) : Promise<Module> {
    return this.mcache.load([name]).then((mdls : Module[]) => Promise.resolve(mdls[0]));
  }

  inject(symbol : string) : Observable<Injectable> {
    return this.icache.inject(symbol);
  }

  register(name : string, deps : string[], program : Program) : void {
    var mdl : Module = {};
    var register : Register = (name : string, property : Property) => mdl[name] = property;
    var receipt : Receipt = program(register);
    this.mcache.load(deps).then((mdls : Module[]) => {
      for(var i = 0; i < mdls.length; i++) {
        receipt.setters[i](mdls[i]);
      }
      receipt.execute();
      this.mcache.store(name, mdl);
    });
  }

  supply(symbol : string, injectable : Observable<Injectable> | Promise<Injectable> | Injectable) : void {
    this.icache.supply(symbol, injectable);
  }

}
