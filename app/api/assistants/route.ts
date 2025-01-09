import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';
import { NextResponse } from 'next/server';

import { Assistant } from '../../types/assistants';
import marketingData from '../../data/marketingAssistants.json';

// Create an OpenAI API client
const openai = new OpenAI();

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function GET() {
    return NextResponse.json(marketingData);
}

export async function POST(request: Request) {
    try {
        const { assistantTitle, inputs } = await request.json();

        // Find the assistant
        const assistant = marketingData.assistants.find(a => a.title === assistantTitle);
        if (!assistant) {
            return new Response('Assistant not found', { status: 404 });
        }

        // Create a system prompt based on the assistant's role and expertise
        const systemPrompt = `Du bist ein Marketing-Assistent mit dem Titel "${assistant.title}". ${assistant.description}

Nutze die folgenden Eingaben des Nutzers:
${Object.entries(inputs)
                .map(([key, value]) => `${key}: ${value}`)
                .join('\n')}`;

        const response = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                {
                    role: 'system',
                    content: systemPrompt
                }
            ],
            stream: true,
            temperature: 0.7,
            presence_penalty: 0.6,
            frequency_penalty: 0.5,
        });

        // Create a stream
        const stream = OpenAIStream(response);
        return new StreamingTextResponse(stream);
    } catch (error) {
        console.error('Error processing assistant:', error);
        return new Response('Error processing assistant', { status: 500 });
    }
}
