export interface CustomPrompt {
    id: string;
    title: string;
    prompt: string;
    category: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface PromptCategory {
    name: string;
    prompts: {
        title: string;
        prompt: string;
    }[];
}

export interface DefaultPrompts {
    categories: PromptCategory[];
}
