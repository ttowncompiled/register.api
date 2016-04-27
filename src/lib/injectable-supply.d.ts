type Injectable = any;

interface Supply<T> {
    [symbol : string] : T;
}
