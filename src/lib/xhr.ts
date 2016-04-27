import { Browser } from '../browser';

export class ChromeBrowser extends Browser {

  constructor() {
    super(chromeFactory, eval);
  }

}

export var chromeFactory : XHRFactory = () : ChromeXHR => new ChromeXHR();

export class ChromeXHR implements XHR {

  request(url : string) : Promise<string> {
    var xhr : XMLHttpRequest = new XMLHttpRequest();
    return new Promise<string>((fulfill : Fulfill<string>, reject : Reject) => {
      xhr.open("GET", url);
      xhr.onload = () : void => {
        if (xhr.status == 200) {
          fulfill(xhr.responseText);
        } else {
          reject(xhr.status);
        }
      }
      xhr.send();
    });
  }

}
