import path from "path";
import dotenv from 'dotenv'
import { Secret } from "jsonwebtoken";

dotenv.config({path:path.resolve(__dirname, "../.env")});

interface ENV {
    DB_URI:string | undefined,
    SECRET_KEY:string | undefined
}
interface Config {
    DB_URI:string
    SECRET_KEY:string
}

function getConfig():ENV {

    return {
        DB_URI:process.env.DB_URI,
        SECRET_KEY:process.env.SECRET_KEY
    }
}
const getSanitizedConfig = (config: ENV): Config => {
    for (const [key, value] of Object.entries(config)) {
      if (value === undefined) {
        throw new Error(`Erro na chave ${key}(variável de ambiente).`);
      }
    }
    return config as Config;
  };
const config = getConfig()
export const sanitizedConfig = getSanitizedConfig(config)