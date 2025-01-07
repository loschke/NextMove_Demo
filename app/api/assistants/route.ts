import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';
import marketingData from '../../data/marketingAssistants.json';

const openai = new OpenAI();

export const maxDuration = 30;

function generateSystemPrompt(assistant: any, inputs: any) {
    switch (assistant.title) {
        case "Blog Headlines":
            return `You are a professional copywriter specializing in creating engaging blog headlines.
Topic: ${inputs.topic}
Keywords: ${inputs.keywords || 'None provided'}
Tone: ${inputs.tone}

Generate 5 attention-grabbing headlines for a blog post about this topic. Each headline should be unique and compelling.`;

        case "Blog Intros":
            return `You are a professional blog writer specializing in creating engaging introductions.
Headline: ${inputs.headline}
Target Audience: ${inputs.targetAudience}
Key Points: ${inputs.keyPoints || 'None provided'}

Write an engaging introduction paragraph for this blog post that hooks the reader and sets up the topic.`;

        case "Social Media Post Ideas":
            return `You are a social media marketing expert specializing in ${inputs.platform} content.
Industry: ${inputs.industry}
Goal: ${inputs.goal}

Generate 5 creative post ideas for ${inputs.platform} that will help achieve the goal of ${inputs.goal.toLowerCase()}. Include hashtag suggestions where appropriate.`;

        case "Email Subject Lines":
            return `You are an email marketing specialist focusing on creating high-converting subject lines.
Email Type: ${inputs.emailType}
Product/Service: ${inputs.productName || 'Not specified'}
Include Urgency: ${inputs.urgency ? 'Yes' : 'No'}

Generate 5 compelling email subject lines for this ${inputs.emailType.toLowerCase()} email that will maximize open rates.`;

        case "SEO Descriptions":
            return `You are an SEO expert specializing in writing optimized meta descriptions.
Page Title: ${inputs.pageTitle}
Keywords: ${inputs.keywords}
Page Type: ${inputs.pageType}

Write an SEO-optimized meta description for this ${inputs.pageType.toLowerCase()} that includes the target keywords naturally and encourages clicks. Keep it under 155 characters.`;

        default:
            return `You are a marketing AI assistant. Please help with the following request.`;
    }
}

export async function POST(req: Request) {
    const { assistantTitle, inputs } = await req.json();

    // Find the assistant configuration
    const assistant = marketingData.assistants.find(a => a.title === assistantTitle);
    if (!assistant) {
        return new Response('Assistant not found', { status: 404 });
    }

    const systemPrompt = generateSystemPrompt(assistant, inputs);

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

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
}
