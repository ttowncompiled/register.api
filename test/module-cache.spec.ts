import { expect } from 'chai';
import { MockBrowser, NullBrowser } from './lib';
import { ModuleCache } from '../src/module-cache';

describe('Module Cache', () => {

  it('should fetch uncached modules', (done : MochaDone) => {
    var evaluate : Eval = (javascript : string) => eval(javascript);
    var cache : ModuleCache = new ModuleCache(new MockBrowser(evaluate));
    cache.load(['test']);
  });

  it('should not fetch cached modules', (done : MochaDone) => {
    var evaluate : Eval = (javascript : string) => eval(javascript);
    var cache : ModuleCache = new ModuleCache(new NullBrowser(evaluate));
    cache.load(['test']);
    cache.store('test', {});
    cache.load(['test']).then((modules: Module[]) => done());
  });

  it('should store new modules', (done : MochaDone) => {
    var mdl : Module = { success : true };
    var cache : ModuleCache = new ModuleCache(new NullBrowser(eval));
    cache.load(['test']);
    cache.store('test', mdl);
    cache.load(['test']).then((modules : Module[]) => {
      expect(modules[0]).to.deep.equal(mdl);
      done();
    });
  });

  it('should handle an empty set of dependencies', (done : MochaDone) => {
    var cache : ModuleCache = new ModuleCache(new NullBrowser(eval));
    cache.load(['test']);
    cache.store('test', { success : true });
    cache.load([]).then((modules : Module[]) => {
      expect(modules).to.be.empty;
      done();
    });
  });

});
