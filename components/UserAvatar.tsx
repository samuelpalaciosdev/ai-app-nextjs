import { User } from 'next-auth';
import { Avatar, AvatarFallback } from './ui/avatar';
import Image from 'next/image';

type UserAvatarProps = {
  user: Pick<User, 'name' | 'image'>;
};

export default function UserAvatar({ user }: UserAvatarProps) {
  return (
    <Avatar>
      {user.image ? (
        <div className='relative w-full h-full aspect-square'>
          <Image
            src={user.image}
            alt='Profile picture'
            className='rounded-full'
            width={36}
            height={36}
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
