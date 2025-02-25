import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Library } from 'lucide-react';
import AddAlbumDialog from './AddAlbumDialog';
import AlbumTable from './AlbumTable';

function AlbumsContent() {
  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle className='flex items-center gap-2'>
              <Library className='siz-5 text-violet-500' />
              Albums Library
            </CardTitle>
            <CardDescription>Manage your albums collection</CardDescription>
          </div>
          <AddAlbumDialog />
        </div>
      </CardHeader>
      <CardContent>
        <AlbumTable />
      </CardContent>
    </Card>
  );
}

export default AlbumsContent;
