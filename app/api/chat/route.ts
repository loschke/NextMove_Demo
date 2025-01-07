import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';

// Create an OpenAI API client
const openai = new OpenAI();

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();

    const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
            {
                role: 'system',
                content: 'Du bist ein hilfreicher Assistent. Formatiere deine Antworten mit Zeilenumbrüchen für bessere Lesbarkeit. Verwende Nummerierungen und Aufzählungen wo es sinnvoll ist.'
            },
            ...messages
        ],
        stream: true,
        temperature: 0.7,
        presence_penalty: 0.6,
        frequency_penalty: 0.5,
    });

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
}
