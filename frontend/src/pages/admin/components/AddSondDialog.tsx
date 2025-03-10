import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { axiosInstance } from '@/lib/axios';
import { useMusicStore } from '@/stores/useMusicStore';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { Plus, Upload } from 'lucide-react';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';

function AddSondDialog() {
  const { albums, fetchSongs, fetchStats } = useMusicStore();

  const [songDialogOpen, setSongDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [newSong, setNewSong] = useState({
    title: '',
    artist: '',
    album: '',
    duration: 0,
  });

  const [files, setFiles] = useState<{
    audio: File | null;
    image: File | null;
  }>({
    audio: null,
    image: null,
  });

  const audioInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      if (!files.audio || !files.image) {
        setIsLoading(false);
        return toast.error('Plase upload both audio or image files.');
      }

      const formadata = new FormData();
      formadata.append('title', newSong.title);
      formadata.append('artist', newSong.artist);
      formadata.append('duration', newSong.duration.toString());

      if (newSong.album && newSong.album !== 'none') {
        formadata.append('albumId', newSong.album);
      }

      formadata.append('image', files.image);
      formadata.append('audio', files.audio);

      await axiosInstance.post('/admin/songs', formadata, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setNewSong({
        title: '',
        artist: '',
        album: '',
        duration: 0,
      });

      setFiles({
        audio: null,
        image: null,
      });

      setSongDialogOpen(false);
      setIsLoading(false);
      fetchSongs();
      fetchStats();

      toast.success('Song added successfully.');
    } catch (error: any) {
      toast.error('faild to upload song.', error.message);
    }
  };

  return (
    <>
      <Dialog
        open={songDialogOpen}
        onOpenChange={setSongDialogOpen}
      >
        <DialogTrigger>
          <Button className='bg-emerald-500 hover:bg-emerald-400 font-semibold'>
            {' '}
            <Plus className='size-5 font-bold' /> Add Song
          </Button>
        </DialogTrigger>

        <DialogContent className='bg-zinc-900 border-zinc-700 max-h-[80vh] overflow-auto'>
          <DialogHeader>
            <DialogTitle className='text-2xl font-bold'>
              Add new Song
            </DialogTitle>
            <DialogDescription>
              Add a new song to your music library
            </DialogDescription>
          </DialogHeader>

          <div className='space-y-4 '>
            <input
              type='file'
              accept='audio/*'
              ref={audioInputRef}
              hidden
              onChange={(e) =>
                setFiles((prev) => ({ ...prev, audio: e.target.files![0] }))
              }
            />

            <input
              type='file'
              accept='image/*'
              ref={imageInputRef}
              hidden
              onChange={(e) =>
                setFiles((prev) => ({ ...prev, image: e.target.files![0] }))
              }
            />

            {/* IMAGE UPLOAD AREA */}
            <div
              className='flex items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer'
              onClick={() => imageInputRef.current?.click()}
            >
              <div className='text-center'>
                {files.image ? (
                  <div className='space-y-2'>
                    <div className='text-sm text-emerald-500'>
                      Image selected:
                    </div>
                    <div className='text-xs text-zinc-400'>
                      {files.image.name.slice(0, 20)}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className='p-3 bg-zinc-800 rounded-full inline-block mb-2'>
                      <Upload className='h-6 w-6 text-zinc-400' />
                    </div>
                    <div className='text-sm text-zinc-400 mb-2'>
                      Upload artwork
                    </div>
                    <Button
                      variant='outline'
                      size='sm'
                      className='text-xs'
                    >
                      Choose File
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Audio upload */}
            <div className='space-y-2'>
              <label className='text-sm font-medium'>Audio File</label>
              <div className='flex items-center gap-2'>
                <Button
                  variant='outline'
                  onClick={() => audioInputRef.current?.click()}
                  className='w-full'
                >
                  {files.audio
                    ? files.audio.name.slice(0, 20)
                    : 'Choose Audio File'}
                </Button>
              </div>
            </div>

            {/* OTHER FIELD */}
            <div className='space-y-2'>
              <label className='text-sm font-semibold'>Title</label>
              <Input
                value={newSong.title}
                onChange={(e) =>
                  setNewSong({ ...newSong, title: e.target.value })
                }
                className='bg-zinc-800 border-zinc-700'
              />
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-semibold'>Artist</label>
              <Input
                value={newSong.artist}
                onChange={(e) =>
                  setNewSong({ ...newSong, artist: e.target.value })
                }
                className='bg-zinc-800 border-zinc-700'
              />
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-semibold'>Duration</label>
              <Input
                type='number'
                min={0}
                value={newSong.duration}
                onChange={(e) =>
                  setNewSong({
                    ...newSong,
                    duration: parseInt(e.target.value) || 0,
                  })
                }
                className='bg-zinc-800 border-zinc-700'
              />
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium'>Album (Optional)</label>
              <Select
                value={newSong.album}
                onValueChange={(value) =>
                  setNewSong({ ...newSong, album: value })
                }
              >
                <SelectTrigger className='bg-zinc-800 border-zinc-700'>
                  <SelectValue placeholder='Select album' />
                </SelectTrigger>
                <SelectContent className='bg-zinc-800 border-zinc-700'>
                  <SelectItem value='none'>No Album (Single)</SelectItem>
                  {albums.map((album) => (
                    <SelectItem
                      key={album._id}
                      value={album._id}
                    >
                      {album.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant='outline'
              onClick={() => setSongDialogOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? 'Uploading...' : 'Add Song'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddSondDialog;
