import { User } from 'next-auth';
import { Avatar } from './ui/avatar';
import Image from 'next/image';
import { AvatarFallback } from '@radix-ui/react-avatar';

type UserAvatarProps = {
  user: Pick<User, 'name' | 'image'>;
};

export default function UserAvatar({ user }: UserAvatarProps) {
  return (
    <Avatar>
      {user.image ? (
        <div className='relative w-full h-full aspect-square'>
          <Image
            fill
            src={user.image}
            alt='Profile image'
            referrerPolicy='no-referrer'
          />
        </div>
      ) : (
        <AvatarFallback>
          <span className='sr-only'>{user?.name}</span>
        </AvatarFallback>
      )}
    </Avatar>
  );
}
