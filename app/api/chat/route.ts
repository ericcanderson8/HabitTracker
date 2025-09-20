import { NextResponse } from 'next/server';
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: Request) {
    try {
        const { messages } = await request.json();

        // 1. Normalize messages -> ensure all content is a string
        const normalizedMessages = messages.map((msg: { role: string; content: unknown }) => ({
            role: msg.role,
            content: typeof msg.content === "string"
                ? msg.content
                : JSON.stringify(msg.content), // 👈 stringify objects
        }));

        // 2. System message
        const systemMessage = {
            role: "system",
            content: `You are a helpful assistant, you will give advice on good habits, and ways of achieving goals.
            When a user presents a large goal break it into smaller chunks for a user to accomplish. When you break down a task break it down into an organization like this [
                { day: "Monday", title: "Wash Dishes", time: "30min" },
                { day: "Tuesday", title: "Go Running", time: "1hr" },
                { day: "Wednesday", title: "Study React", time: "2hr" },
                { day: "Thursday", title: "Grocery Shopping", time: "45min" },
                { day: "Friday", title: "Clean Room", time: "1hr" },
                { day: "Saturday", title: "Laundry", time: "1.5hr" },
                { day: "Sunday", title: "Meal Prep", time: "2hr" }
            ];
            Just add this to your response! Your total response must look like this:
            {"message": "your message back goes here", "schedule": [/* Json schedule */]} if you don't give a schedule and are just answering basic questions set "schedule": null like that `
        };

        // 3. Send to OpenAI
        const toApi = [systemMessage, ...normalizedMessages];
        const response = await openai.chat.completions.create({
            model: "gpt-4.1-mini",
            messages: toApi,
            max_tokens: 1000,
            temperature: 0.8,
        });

        const assistantMessage = response.choices[0].message.content;
        return NextResponse.json({ assistantMessage }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to generate response from the AI" },
            { status: 500 }
        );
    }
}
