import { Configuration } from "openai";
import dotenv from 'dotenv';
dotenv.config();
export const configureOpenAI=() => {
    const config = new Configuration({
        apiKey:process.env.OPEN_AI_SECRET,
        organization:process.env.OPEN_AI_ORGANIZATION_ID,
    })
    return config;
};
