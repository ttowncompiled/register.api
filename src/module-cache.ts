/// <reference path="lib/module-cache.d.ts" />
import { Browser } from './browser';

export class ModuleCache {

  private cache: Cache<Module> = {};

  constructor(private browser : Browser) {}

  private fetch(name : string) : Resolver<Module> {
    var resolver : Resolver<Module> = { fulfill : null, promise : null, reject : null };
    var promise : Promise<Module> = new Promise<Module>((fulfill : Fulfill<Module>, reject : Reject) => {
      resolver.fulfill = fulfill;
      resolver.reject = reject;
      this.browser.fetch(name);
    });
    resolver.promise = promise;
    return resolver;
  }

  load(names : string[]) : Promise<Module[]> {
    if (!names || names.length == 0) {
      return Promise.resolve([]);
    }
    var promises : Promise<Module>[] = names.map((name : string) => {
      if (!(name in this.cache)) {
        this.cache[name] = this.fetch(name);
      }
      return this.cache[name].promise;
    });
    return Promise.all(promises);
  }

  store(name : string, mdl : Module) : void {
    this.cache[name].fulfill(mdl);
  }

}
