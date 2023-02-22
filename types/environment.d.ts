namespace NodeJS {
    interface ProcessEnv extends NodeJS.ProcessEnv {

      FACEBOOK_ID: string
      FACEBOOK_SECRET: string

      GOOGLE_ID: string
      GOOGLE_SECRET: string

      DATABASE_URL: string
      NEXTAUTH_SECRET: string
    }
  }