// This is where we specify the typings of req.session.*
declare module "iron-session" {
  export interface IronSessionData {
    user?: {
        email: string,
        isAdmin: boolean
    };
  }
  
}

export{}