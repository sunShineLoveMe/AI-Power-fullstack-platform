import { WorkflowDesigner } from '@/components/agent/WorkflowDesigner';

export default function WorkflowPage() {
  return (
    <div className="space-y-6">
      <div className="bg-slate-800/30 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50">
        <h2 className="text-2xl font-bold text-slate-100 mb-4">工作流编排</h2>
        <WorkflowDesigner />
      </div>
    </div>
  );
} 