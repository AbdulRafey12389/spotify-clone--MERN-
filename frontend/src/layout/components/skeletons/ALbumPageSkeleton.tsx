import { useMusicStore } from '@/stores/useMusicStore';

const AlbumPageSkeleton = () => {
  const { currentAlbum } = useMusicStore();

  return (
    <div className='p-10 bg-black min-h-screen text-white animate-pulse'>
      {/* Album Cover and Info */}
      <div className='flex items-center gap-8'>
        <div className='w-56 h-56 bg-zinc-800 rounded-md'></div>{' '}
        {/* Updated Color */}
        <div className='space-y-5'>
          <div className='w-72 h-10 bg-zinc-800 rounded'></div>{' '}
          {/* Updated Color */}
          <div className='w-52 h-6 bg-zinc-800 rounded'></div>
          <div className='w-44 h-5 bg-zinc-800 rounded'></div>
        </div>
      </div>

      {/* Play Button */}
      <div className='mt-6 w-16 h-16 bg-zinc-800 rounded-full'></div>

      {/* Song List */}
      <div className='mt-8'>
        {[...Array(currentAlbum?.songs?.length)].map((_, index) => (
          <div
            key={index}
            className='flex items-center justify-between py-4 border-b border-zinc-700'
          >
            <div className='flex items-center gap-6'>
              <div className='w-6 h-6 bg-zinc-800 rounded'></div>
              <div>
                <div className='w-48 h-5 bg-zinc-800 rounded'></div>
                <div className='w-32 h-4 bg-zinc-800 rounded mt-1'></div>
              </div>
            </div>
            <div className='w-12 h-5 bg-zinc-800 rounded'></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumPageSkeleton;
