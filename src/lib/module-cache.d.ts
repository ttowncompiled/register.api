interface Cache<T> {
  [key : string] : Resolver<T>;
}

interface Module {
  [symbol : string] : Property
}

type Property = any;

type Reject = (reason : any) => void;

type Fulfill<T> = (value? : T | PromiseLike<T>) => void;

interface Resolver<T> {
  fulfill : Fulfill<T>;
  promise : Promise<T>;
  reject : Reject;
}
