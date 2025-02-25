import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

const UnauthorizedMessage = () => {
  return (
    <div className='flex items-center justify-center min-h-screen bg-black text-white'>
      <Card className='w-full max-w-md p-6 bg-zinc-900 text-center border border-zinc-800 shadow-lg rounded-xl'>
        <CardContent className='space-y-4'>
          <div className='flex justify-center'>
            <AlertTriangle className='w-12 h-12 text-red-500' />
          </div>
          <h2 className='text-2xl font-semibold'>Access Denied</h2>
          <p className='text-zinc-400'>
            You don't have permission to view this page. If you believe this is
            a mistake, please contact the admin.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default UnauthorizedMessage;
