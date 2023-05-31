import { GetPublicKeyOrSecret, Secret } from "jsonwebtoken"

export {}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DB_URI:string,
            SECRET_KEY?: Secret | GetPublicKeyOrSecret
        }
    }
}
