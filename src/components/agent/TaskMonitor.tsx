"use client";

import { useState } from 'react';

interface Task {
  id: string;
  name: string;
  status: 'running' | 'completed' | 'failed';
  progress: number;
  startTime: string;
  endTime?: string;
}

export function TaskMonitor() {
  const [tasks, setTasks] = useState<Task[]>([]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        {tasks.map((task) => (
          <div key={task.id} className="bg-slate-800/50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <h3 className="text-slate-100">{task.name}</h3>
              <span className={`px-2 py-1 rounded text-xs ${
                task.status === 'running' ? 'bg-blue-500/20 text-blue-400' :
                task.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                {task.status}
              </span>
            </div>
            <div className="mt-2">
              <div className="w-full bg-slate-700/50 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all"
                  style={{ width: `${task.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 