import { expect } from 'chai';
import { Observable, Observer } from 'rxjs/Rx';
import { MockBrowser, NullBrowser } from './lib';
import { InjectableSupply } from '../src/injectable-supply';
import { ModuleCache } from '../src/module-cache';
import { Registrar } from '../src/registrar';

describe('Registrar', () => {
  
  it('should be able to import a module registered with no dependencies', (done : MochaDone) => {
    var receipt : Receipt = {
      execute : () => {},
      setters : []
    };
    var program : Program = (register : Register) => receipt;
    var icache : InjectableSupply = new InjectableSupply();
    var mcache : ModuleCache = new ModuleCache(new NullBrowser(eval));
    var registrar : Registrar = new Registrar(icache, mcache);
    registrar.register('test', [], program);
    registrar.import('test').then((mdl : Module) => {
      expect(mdl).to.be.empty;
      done();
    });
  });
  
  it('should be able to import a module registered with dependencies', (done : MochaDone) => {
    var dep1Receipt : Receipt = {
      execute : () => {},
      setters : []
    };
    var dep2Receipt : Receipt = {
      execute : () => {},
      setters : []
    };
    var testReceipt : Receipt = {
      execute : () => {},
      setters : [
        (mdl : Module) => {},
        (mdl : Module) => {}
      ]
    };
    var dep1Program : Program = (register : Register) => dep1Receipt;
    var dep2Program : Program = (register : Register) => dep2Receipt;
    var testProgram : Program = (register : Register) => testReceipt;
    var icache : InjectableSupply = new InjectableSupply();
    var mcache : ModuleCache = new ModuleCache(new NullBrowser(eval));
    var registrar : Registrar = new Registrar(icache, mcache);
    registrar.register('dep1', [], dep1Program);
    registrar.register('dep2', [], dep2Program);
    registrar.register('test', ['dep1', 'dep2'], testProgram);
    registrar.import('test').then((mdl : Module) => {
      expect(mdl).to.be.empty;
      done();
    });
  });

  it('should inject supplied basic Injectables', (done : MochaDone) => {
    var supply : Injectable = { success : true };
    var icache : InjectableSupply = new InjectableSupply();
    var mcache : ModuleCache = new ModuleCache(new MockBrowser(eval));
    var registrar : Registrar = new Registrar(icache, mcache);
    registrar.supply('test', supply);
    registrar.inject('test').subscribe((injection : Injectable) => {
      expect(injection).to.deep.equal(supply);
      done();
    });
  });

  it('should inject supplied Promises', (done : MochaDone) => {
    var supply : Injectable = { success : true };
    var promise : Promise<Injectable> = new Promise((fulfill : Fulfill<Injectable>, reject : Reject) => {
      fulfill(supply);
    });
    var icache : InjectableSupply = new InjectableSupply();
    var mcache : ModuleCache = new ModuleCache(new MockBrowser(eval));
    var registrar : Registrar = new Registrar(icache, mcache);
    registrar.supply('test', promise);
    registrar.inject('test').subscribe((injection : Injectable) => {
      expect(injection).to.deep.equal(supply);
      done();
    });
  });

  it('should inject supplied Observables', (done : MochaDone) => {
    var supply : Injectable = { success : true };
    var observable : Observable<Injectable> = Observable.create((observer: Observer<Injectable>) => {
      observer.next(supply);
    });
    var icache : InjectableSupply = new InjectableSupply();
    var mcache : ModuleCache = new ModuleCache(new MockBrowser(eval));
    var registrar : Registrar = new Registrar(icache, mcache);
    registrar.supply('test', observable);
    registrar.inject('test').subscribe((injection : Injectable) => {
      expect(injection).to.deep.equal(supply);
      done();
    });
  });

});
