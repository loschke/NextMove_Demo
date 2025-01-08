import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';

const openai = new OpenAI();

export async function POST(req: Request) {
    try {
        const { description, formula } = await req.json();

        const response = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                {
                    role: 'system',
                    content: `Du bist ein Experte für die Erstellung von Bildgenerierungs-Prompts. 
Generiere drei professionelle englische Prompts basierend auf der deutschen Beschreibung.
Verwende dabei diese Prompt-Formel als Basis: ${formula}

Formatiere deine Antwort als nummerierte Liste mit drei Vorschlägen.
Beispiel:
1. [erster prompt]
2. [zweiter prompt]
3. [dritter prompt]`
                },
                {
                    role: 'user',
                    content: `Beschreibung: ${description}`
                }
            ],
            temperature: 0.8,
            stream: true,
        });

        const stream = OpenAIStream(response);
        return new StreamingTextResponse(stream);
    } catch (error) {
        console.error('Prompt generation error:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to generate prompts' }),
            { status: 500 }
        );
    }
}
