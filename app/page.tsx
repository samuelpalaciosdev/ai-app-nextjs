import SignInButton from '@/components/SignInButton';
import { Button } from '@/components/ui/Button';
import { getAuthSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getAuthSession();

  if (session?.user) {
    return redirect('/dashboard');
  }
  return (
    <main className=''>
      <section className='space-y-6 pt-6 pb-8 lg:py-32'>
        <div className='container flex flex-col items-center max-w[64rem] mx-auto gap-4 text-center'>
          <h1 className='font-semibold text-4xl lg:text-7xl'>
            Welcome to Quizzuh
          </h1>
          <p className='max-w[42rem] text-muted-foreground sm:text-xl sm:leading-8'>
            Quizzuh is a quiz app that allows you to create and share quizzes
          </p>
          <SignInButton text='Sign in with Google' />
        </div>
      </section>
    </main>
  );
}
