import QuizMeCard from '@/components/QuizMeCard';
import { getAuthSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Dashboard | Quizzuh',
};

export default async function Dashboard() {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect('/');
  }
  return (
    <div className='max-w-7xl mx-auto py-8'>
      <div className='flex items-center'>
        <h1 className='text-3xl lg:text-5xl font-bold tracking-tight'>
          Dashboard
        </h1>
      </div>
      <div className='grid mt-6 gap-4 md:grid-cols-2'>
        <QuizMeCard />
        {/* <HistoryCard /> */}
      </div>
      <div className='grid mt-4 gap-4 md:grid-cols-4 lg:grid-cols-7'></div>
    </div>
  );
}
