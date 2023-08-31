import { getAuthSession } from '@/lib/auth';
import { strict_output } from '@/lib/gpt';
import { quizSchema } from '@/lib/validations/quiz';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export const POST = async (req: Request, res: Response) => {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json(
        {
          error: 'Unauthorized, you must be logged in to create a quiz',
        },
        {
          status: 401,
        }
      );
    }

    const body = await req.json();
    const { type, amount, topic } = quizSchema.parse(body);
    let questions: any;
    if (type === 'open_ended') {
      questions = await strict_output(
        'You are a friendly and helpful AI that is able to generate open-ended questions and answers for a quiz. The length of the answer should not exceed 20 words, store all the pair of questions and answers in a JSON array',
        new Array(amount).fill(
          `You are going to generate a random medium open-ended questions about ${topic}`
        ),
        {
          question: 'question',
          answer: 'answer with max length of 20 words',
        }
      );
    } else if (type === 'mcq') {
      questions = await strict_output(
        'You are a friendly and helpful AI that is able to generate mcq questions and answers for a quiz. The length of the answer should not exceed 20 words, store all the pair of questions and answers in a JSON array',
        new Array(amount).fill(
          `You are going to generate a random medium open-ended questions about ${topic}`
        ),
        {
          question: 'question',
          answer: 'answer with max length of 20 words',
          option1: '1st option with max length of 20 words',
          option2: '2nd option with max length of 20 words',
          option3: '3rd option with max length of 20 words',
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
        {
          error: error.issues,
        },
        {
          status: 400,
        }
      );
    }
  }
};

// import { strict_output } from '@/lib/gpt';
// import { quizSchema } from '@/lib/validations/quiz';
// import { NextResponse } from 'next/server';
// import { ZodError } from 'zod';

// export const POST = async (request: Request, response: Response) => {
//   try {
//     const body = await request.json();
//     const { topic, amount, type } = quizSchema.parse(body);

//     let questions: any;
//     if (type === 'mcq') {
//       questions = await strict_output(
//         'You are a friendly and helpful AI that is able to generate questions and answers for a quiz. The length of the answer should not exceed20 words, store all the pair of questions and answers in a JSON array',
//         `You are gonna generate a random medium open-ended question about the topic ${topic}`,
//         {
//           question: 'question',
//           answer: 'answer with max length of 20 words',
//         }
//       );
//     }

//     return NextResponse.json(
//       {
//         questions,
//       },
//       {
//         status: 200,
//       }
//     );
//   } catch (error) {
//     if (error instanceof ZodError) {
//       return NextResponse.json(
//         {
//           error: error.issues,
//         },
//         {
//           status: 400,
//         }
//       );
//     }
//   }
// };
