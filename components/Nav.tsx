import Link from 'next/link';
import SignInButton from './SignInButton';
import { getAuthSession } from '@/lib/auth';
import UserDropdown from './UserDropdown';

export default async function Nav() {
  const session = await getAuthSession();
  console.log(session?.user);
  return (
    <nav className='fixed inset-x-0 top-0 h-fit py-2 bg-white dark:bg-gray-950 z-[10] border-b border-zinc-300'>
      <div className='container mx-auto max-w-7xl flex items-center justify-between gap-2'>
        {/* Logo */}
        <Link
          href={'/'}
          className='rounded-md border-2 border-b-4 border-r-2 border-black px-2 py-1 text-xl font-semibold transition-all hover:-translate-y-[2px] md:block dark:border-white'
        >
          Quizzuh
        </Link>
        <ul className='flex items-center gap-2'>
          {/* Sign in button or profile pic */}
          {session?.user ? (
            <UserDropdown user={session.user} />
          ) : (
            <li>
              <SignInButton text='Sign in' />
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
