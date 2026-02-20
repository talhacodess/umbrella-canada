import dotenv from 'dotenv'
dotenv.config();
export const {
    APP_PORT,
    MONGO_URI,
    TOKEN_KEY,
    EMAIL,
    BASEURL,
    PLACE_ID,
    GOOGLE_API_KEY,
    PASS
} = process.env;