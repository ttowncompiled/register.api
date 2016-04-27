import { MockBrowser } from './lib';

describe('Browser', () => {

  it('should fetch and evaluate JavaScript modules', (done : MochaDone) => {
    var evaluate : Eval = (javascript : string) => eval(javascript);
    new MockBrowser(evaluate).fetch('test');
  });

});
