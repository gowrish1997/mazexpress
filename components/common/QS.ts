import QueryString from "qs";

// author: raunak (a7)
export class QS {
  public page?: number;
  public per_page?: number;
  public offset?: number;

  public stringified: string = "";

  constructor(obj?: any) {
    Object.assign(this, obj);
    this.stringified = QueryString.stringify(obj, {
      arrayFormat: "comma",
      addQueryPrefix: true,
    });
  }

  public append(obj: any) {
    Object.assign(this, obj);
  }

  public clg(arg?: any) {
    if (arg === "pd") {
      console.log(Object.getOwnPropertyDescriptors(this));
      return;
    }
    console.log(this.stringified);
  }
}
