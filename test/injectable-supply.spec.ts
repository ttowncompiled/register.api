import { expect } from 'chai';
import { Observable, Observer } from 'rxjs/Rx';
import { InjectableSupply } from '../src/injectable-supply';

describe('Injectable Supply', () => {

  it('should inject supplied basic Injectables', (done : MochaDone) => {
    var supply : Injectable = { success : true };
    var cache : InjectableSupply = new InjectableSupply();
    cache.supply('test', supply);
    cache.inject('test').subscribe((injection : Injectable) => {
      expect(injection).to.deep.equal(supply);
      done();
    });
  });

  it('should inject supplied Promises', (done : MochaDone) => {
    var supply : Injectable = { success : true };
    var promise : Promise<Injectable> = new Promise((fulfill : Fulfill<Injectable>, reject : Reject) => {
      fulfill(supply);
    });
    var cache : InjectableSupply = new InjectableSupply();
    cache.supply('test', promise);
    cache.inject('test').subscribe((injection : Injectable) => {
      expect(injection).to.deep.equal(supply);
      done();
    });
  });

  it('should inject supplied Observables', (done : MochaDone) => {
    var supply : Injectable = { success : true };
    var observable : Observable<Injectable> = Observable.create((observer: Observer<Injectable>) => {
      observer.next(supply);
    });
    var cache : InjectableSupply = new InjectableSupply();
    cache.supply('test', observable);
    cache.inject('test').subscribe((injection : Injectable) => {
      expect(injection).to.deep.equal(supply);
      done();
    });
  });

});
