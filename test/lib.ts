import { Browser } from '../src/browser';

export class MockBrowser extends Browser {
  
  constructor(evaluate : Eval) {
    super(mockFactory, evaluate);
  }

}

export var mockFactory : XHRFactory = () : MockXHR => new MockXHR();

export class MockXHR implements XHR {

  request(url : string) : Promise<string> {
    return Promise.resolve('done()');
  }

}

export class NullBrowser extends Browser {

  constructor(evaluate : Eval) {
    super(nullFactory, evaluate);
  }

}

export var nullFactory : XHRFactory = () : NullXHR => new NullXHR();

export class NullXHR implements XHR {

  requested : boolean = false;

  request(url : string) : Promise<string> {
    var responseText : string = this.requested ? 'done()' : '';
    this.requested = true;
    return Promise.resolve(responseText);
  }

}
