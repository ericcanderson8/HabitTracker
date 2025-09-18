import { NextResponse } from 'next/server';
import OpenAI from "openai";

// 

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: Request) {
    try {
        const { messages } = await request.json();
        // 2. Make the API call to OpenAI

        console.log(messages)

        const systemMessage = {
            role: "system",
            content: 'You are a helpful assistant, that breakdown large complex tasks into bite-size tasks, your first goal is to break it into daily tasks you can do everyday to make progress towards your goal these tasks these should be about an hour long and label them, please do not answer any other questions and just say your are here to help people complete their goals and aspirations, label the amount of time it would take to do each task estimate'
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