/// <reference path="lib/browser.d.ts" />

export class Browser {

  constructor(private XHR : XHRFactory, private evaluate : Eval) {}

  fetch(url : string) : void {
    this.XHR().request(url)
      .then((responseText : string) => this.evaluate(responseText))
      .catch((reason : any) => console.error(reason));
  }

}
