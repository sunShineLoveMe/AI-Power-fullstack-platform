"use client";

import { useState } from 'react';

interface Agent {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive';
  lastActive: string;
}

export function AgentManager() {
  const [agents, setAgents] = useState<Agent[]>([]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.map((agent) => (
          <div key={agent.id} className="bg-slate-800/50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <h3 className="text-slate-100">{agent.name}</h3>
              <span className={`px-2 py-1 rounded text-xs ${
                agent.status === 'active' ? 'bg-green-500/20 text-green-400' :
                'bg-slate-500/20 text-slate-400'
              }`}>
                {agent.status}
              </span>
            </div>
            <div className="mt-2 text-sm text-slate-400">
              <p>类型: {agent.type}</p>
              <p>最后活动: {agent.lastActive}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 