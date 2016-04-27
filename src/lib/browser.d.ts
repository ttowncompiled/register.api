type Eval = (javascript : string) => any;

interface XHR {
  request(url : string) : Promise<string>;
}

type XHRFactory = () => XHR;
