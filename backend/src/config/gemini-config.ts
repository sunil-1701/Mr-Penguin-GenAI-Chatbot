import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();


export const configureGemini=() => {
    const config = new GoogleGenerativeAI(process.env.GEMINI_SECRET);
    return config;
}