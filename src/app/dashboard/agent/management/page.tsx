import { AgentManager } from '@/components/agent/AgentManager';

export default function AgentManagementPage() {
  return (
    <div className="space-y-6">
      <div className="bg-slate-800/30 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50">
        <h2 className="text-2xl font-bold text-slate-100 mb-4">Agent管理</h2>
        <AgentManager />
      </div>
    </div>
  );
} 