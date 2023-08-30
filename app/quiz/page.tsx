import QuizCreationForm from '@/components/QuizCreationForm';
import { getAuthSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Quiz | Quizuh',
  description: 'Create your own quiz and share it with your friends!',
};

export default async function QuizPage() {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect('/');
  }
  return (
    <>
      {/* Quiz form */}
      <QuizCreationForm />
    </>
  );
}
