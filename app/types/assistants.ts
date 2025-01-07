export interface MarketingData {
    categories: string[];
    assistants: DefaultAssistant[];
}

export interface DefaultAssistant {
    title: string;
    description: string;
    category: string;
    icon: string;
    inputs?: AssistantInput[];
}

export interface AssistantInput {
    id: string;
    label: string;
    type: 'text' | 'textarea' | 'select' | 'checkbox';
    placeholder?: string;
    required: boolean;
    options?: string[];
    default?: string | boolean;
}

export interface Assistant extends DefaultAssistant {
    isCustom?: boolean;
    isActive?: boolean;
    systemPrompt?: string;
}

export interface CustomAssistant extends Assistant {
    id: string;
    title: string;
    description: string;
    category: string;
    icon: string;
    inputs: AssistantInput[];
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    systemPrompt: string;
}

export interface AssistantCategory {
    id: string;
    name: string;
}

// Form builder types
export interface InputFieldForm {
    id: string;
    label: string;
    type: 'text' | 'textarea' | 'select' | 'checkbox';
    placeholder?: string;
    required: boolean;
    options: string[];
    isEditing: boolean;
}

export type InputFieldType = 'text' | 'textarea' | 'select' | 'checkbox';

export interface InputTypeOption {
    value: InputFieldType;
    label: string;
    icon: string;
}
