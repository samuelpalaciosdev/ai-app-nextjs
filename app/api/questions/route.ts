import { strict_output } from '@/lib/gpt';
import { getAuthSession } from '@/lib/auth';
import { quizSchema } from '@/lib/validations/quiz';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export async function POST(req: Request, res: Response) {
  try {
    const session = await getAuthSession();

    const body = await req.json();
    const { amount, topic, type } = quizSchema.parse(body);
    let questions: any;
    if (type === 'open_ended') {
      questions = await strict_output(
        'You are a helpful and friendly AI that is able to generate a pair of question and answers, the length of each answer should not be more than 20 words, store all the pairs of answers and questions in a JSON array',
        new Array(amount).fill(
          `You are going to generate a random medium difficulty open-ended questions about ${topic}`
        ),
        {
          question: 'question',
          answer: 'answer with max length of 20 words',
        }
      );
    } else if (type === 'mcq') {
      questions = await strict_output(
        'You are a helpful and friendly AI that is able to generate mcq questions and answers, the length of each answer should not be more than 20 words, store all answers and questions and options in a JSON array',
        new Array(amount).fill(
          `You are going to generate a random medium difficulty mcq question about ${topic}`
        ),
        {
          question: 'question',
          answer: 'answer with max length of 20 words',
          option1: 'option1 with max length of 20 words',
          option2: 'option2 with max length of 20 words',
          option3: 'option3 with max length of 20 words',
        }
      );
    }
    return NextResponse.json(
      {
        questions: questions,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.issues },
        {
          status: 400,
        }
      );
    } else {
      console.error('gpt error', error);
      return NextResponse.json(
        { error: 'An unexpected error occurred.' },
        {
          status: 500,
        }
      );
    }
  }
}
