export interface CustomPrompt {
    id: string;
    title: string;
    prompt: string;
    category: string;
    description?: string;
    useCase?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface PromptCategory {
    name: string;
    description: string;
    prompts: {
        title: string;
        prompt: string;
        description: string;
        useCase: string;
    }[];
}

export interface DefaultPrompts {
    categories: PromptCategory[];
}
