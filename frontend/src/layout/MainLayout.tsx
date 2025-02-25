import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { Outlet } from 'react-router-dom';
import LeftSidebar from './components/LeftSidebar';
import { FriendActivity } from './components/FriendActivity';
import AudioPLayer from './components/AudioPLayer';
import PlaybackControls from './components/PlaybackControls';
import { useEffect, useState } from 'react';

function MainLayout() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    window.addEventListener('resize', checkMobile);

    return () => window.addEventListener('resize', checkMobile);
  }, []);

  return (
    <div className='h-screen bg-black text-white flex flex-col'>
      <ResizablePanelGroup
        direction='horizontal'
        className='flex-1 flex h-full overflow-hidden p-2 '
      >
        {/* AUDIO PLAYER COMPONENTS... */}
        <AudioPLayer />

        {/* LEFT SIDEBAR COMPONENT... */}
        <ResizablePanel
          defaultSize={20}
          minSize={isMobile ? 0 : 10}
          maxSize={30}
        >
          <LeftSidebar />
        </ResizablePanel>

        <ResizableHandle className='w-2 bg-black rounded-lg transition-colors' />

        {/* MAIN CONTENT... */}
        <ResizablePanel
          defaultSize={isMobile ? 80 : 60}
          className='rounded-md'
        >
          <Outlet />
        </ResizablePanel>

        {!isMobile && (
          <>
            <ResizableHandle className='w-2 bg-black rounded-lg transition-colors' />

            {/* RIGHT SIDEBAR COMPONENT... */}
            <ResizablePanel
              defaultSize={20}
              minSize={0}
              maxSize={25}
              collapsedSize={0}
            >
              <FriendActivity />
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>

      <PlaybackControls />
    </div>
  );
}

export default MainLayout;
