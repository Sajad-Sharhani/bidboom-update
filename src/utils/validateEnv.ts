import envalid from "envalid";

function validateEnv() {
  envalid.cleanEnv(process.env, {
    JWT_SECRET: envalid.str(),
    MONGO_PASSWORD: envalid.str(),
    MONGO_PATH: envalid.str(),
    MONGO_USER: envalid.str(),
    PORT: envalid.port(),
    KAVENEGAR_API_KEY: envalid.str(),
    // REDIRECT: str(),
    // GOOGLE_CLIENT_ID: str(),
    // GOOGLE_CLIENT_SECRET: str(),
    // EMAIL_HOST: str(),
    // EMAIL_PORT: num(),
    // EMAIL_USER: str(),
    // EMAIL_PASSWORD: str(),
  });
}

export default validateEnv;
