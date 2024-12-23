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
    <div className="h-screen flex flex-col overflow-hidden bg-gradient-to-b from-[#000033] via-[#000044] to-[#000066]">
      <div className="flex-none">
        <Navbar />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-none">
          <Sidebar />
        </div>

        <main className="flex-1 overflow-y-auto p-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-lg shadow-xl p-6">
            {children}
          </div>
        </main>
      </div>

      <div className="flex-none">
        <BottomBar />
      </div>
    </div>
  );
}
