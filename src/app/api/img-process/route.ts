import { NextRequest, NextResponse } from "next/server";
import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";

const MODEL_NAME = "gemini-pro-vision";
const API_KEY = process.env.GEMINI_API_KEY ?? "";

export async function POST(request: NextRequest) {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
        return new Response("No file provided", { status: 400 });
    }
    const extension = file.name.split('.').pop();


    //save the buffer to an image file of type png
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const photoData = buffer.toString("base64");

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const generationConfig = {
        temperature: 0.4,
        topK: 32,
        topP: 1,
        maxOutputTokens: 4096,
    };
    const safetySettings = [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
    ];

    const parts = [
        {
            inlineData: {
                mimeType: `image/${extension}`,
                data: photoData
            }
        },
        { text: "\nGiven this receipt, return a JSON object with the following structure and types. Default numbers to 0 if not found or calculated. All numbers must be there. Put 0 if nothing found. {items: [...], tip: Number, tax: Number} Where Items is a JSON object with the following { name: String, quantity: Number, price: Number}. If there are multiple of each item, the price should be the total. For example, if item a costs $3 and 5 of item a were purchased, price should be $15 quantity should be 5. Only return the json object, nothing else." },
    ];

    const result = await model.generateContent({
        contents: [{ role: "user", parts }],
        generationConfig,
        safetySettings,
    });

    const response = result.response;
    //rmove the first line and the last line of the respone
    const lines = response.text().split("\n");
    lines.shift();
    lines.pop();
    const returnData = JSON.parse(lines.join("\n"));
    for (const item of returnData.items) {
        item.people = [];
    }

    return NextResponse.json(returnData);
}