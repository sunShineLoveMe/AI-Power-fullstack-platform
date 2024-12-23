import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import Navbar from '@/components/dashboard/Navbar';
import Sidebar from '@/components/dashboard/Sidebar';
import BottomBar from '@/components/dashboard/BottomBar';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const token = headersList.get('cookie')?.includes('token');

  if (!token) {
    redirect('/login');
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-none">
        <Navbar />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-none">
          <Sidebar />
        </div>

        <main className="flex-1 overflow-y-auto p-8">
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl shadow-2xl border border-slate-700/50">
            <div className="p-6">
              {children}
            </div>
          </div>
        </main>
      </div>

      <div className="flex-none">
        <BottomBar />
      </div>
    </div>
  );
}
