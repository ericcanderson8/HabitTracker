import { NextResponse } from 'next/server';
import OpenAI from "openai";

// 

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: Request) {
    try {
        const { messages } = await request.json();
        // 2. Make the API call to OpenAI


        const systemMessage = {
            role: "system",
            content: `You are a helpful assistant, you will give advice on good habits, and ways of achieving goals.
             When a user presents a large goal break it into smaller chunks for a user to accomplish.
            `
        }

        const toApi = [systemMessage, ...messages]
        const response = await openai.chat.completions.create({
            model: "gpt-4.1-mini",
            messages: toApi,
            max_tokens: 1000,
            temperature: 0.8,
        });
        
        const assistantMessage = response.choices[0].message.content;
        return NextResponse.json({ assistantMessage }, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Failed to generate response from the AI" }, { status: 500 });
    }

    }