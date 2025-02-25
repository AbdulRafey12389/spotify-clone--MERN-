import { SignedOut, UserButton } from '@clerk/clerk-react';
import { LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';
import SignInOAuthButtons from './SignInOAuthButtons ';
import { useAuthStore } from '@/stores/useAuthStore';
import { cn } from '@/lib/utils';
import { buttonVariants } from './ui/button';
import { useMusicStore } from '@/stores/useMusicStore';
import { useEffect } from 'react';

function Topbar() {
  const { isAdmin } = useAuthStore();
  const { fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs } =
    useMusicStore();

  useEffect(() => {
    fetchFeaturedSongs();
    fetchMadeForYouSongs();
    fetchTrendingSongs();
  }, [fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs]);

  return (
    <div className='flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10'>
      <div className='flex items-center gap-2'>
        <img
          src='./images/spotify-logo.png'
          className='size-8'
          alt='Spotify logo'
        />
        <h1 className='text-3xl font-bold'>Spotify</h1>
      </div>

      <div className='flex items-center gap-4'>
        {isAdmin && (
          <Link
            to='/admin'
            className={cn(buttonVariants({ variant: 'outline' }))}
          >
            <LayoutDashboard className='size-4 mr-2' />
            Admin Dashboard
          </Link>
        )}

        <SignedOut>
          <SignInOAuthButtons />
        </SignedOut>

        <UserButton />
      </div>
    </div>
  );
}

export default Topbar;
