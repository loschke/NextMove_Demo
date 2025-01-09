import { NextResponse } from 'next/server';
import assistantData from '../../data/assistantPersonas.json';

export async function GET() {
    return NextResponse.json(assistantData);
}
