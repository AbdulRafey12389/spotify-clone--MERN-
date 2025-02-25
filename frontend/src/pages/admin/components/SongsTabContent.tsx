import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Music } from 'lucide-react';
import SongTable from './SongTable';
import AddSondDialog from './AddSondDialog';

function SongsTabContent() {
  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle className='flex items-center gap-2'>
              <Music className='siz-5 text-emerald-500' />
              Songs Library
            </CardTitle>
            <CardDescription>Manage your music tracks</CardDescription>
          </div>
          <AddSondDialog />
        </div>
      </CardHeader>
      <CardContent>
        <SongTable />
      </CardContent>
    </Card>
  );
}

export default SongsTabContent;
