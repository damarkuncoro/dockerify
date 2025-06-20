// src/components/ContainerCategory.tsx
import React from 'react';

interface Container {
  id: string;
  name: string[];
  image?: string;
  state?: string;
  status?: string;
  created?: string;
}

interface Props {
  title: string;
  containers: Container[];
  onAction: (id: string, action: 'start' | 'stop' | 'restart' | 'remove') => void;
  actionLoading: { [id: string]: string };
}

const ContainerCategory: React.FC<Props> = ({ title, containers, onAction, actionLoading }) => {
  if (containers.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-3 text-white">{title}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 text-white font-mono shadow-md rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-indigo-700 text-left text-sm uppercase tracking-wider">
              <th className="px-4 py-3">Container</th>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {containers.map((container) => (
              <tr key={container.id} className="hover:bg-gray-700/50 transition duration-150">
                <td className="px-4 py-3 font-semibold">{container.name.join(', ')}</td>
                <td className="px-4 py-3">{container.image}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      container.state === 'running'
                        ? 'bg-green-600 text-white'
                        : 'bg-red-600 text-white'
                    }`}
                  >
                    {container.state?.toUpperCase() ?? 'UNKNOWN'}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">{container.created}</td>
                <td className="px-4 py-3 space-x-2 text-xs text-center">
                  {container.state !== 'running' ? (
                    <button
                      onClick={() => onAction(container.id, 'start')}
                      disabled={actionLoading[container.id] === 'start'}
                      className="bg-green-600 hover:bg-green-700 px-2 py-1 rounded shadow disabled:opacity-50"
                    >
                      {actionLoading[container.id] === 'start' ? 'Starting...' : '✅ Start'}
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => onAction(container.id, 'stop')}
                        disabled={actionLoading[container.id] === 'stop'}
                        className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded shadow disabled:opacity-50"
                      >
                        {actionLoading[container.id] === 'stop' ? 'Stopping...' : '⛔ Stop'}
                      </button>
                      <button
                        onClick={() => onAction(container.id, 'restart')}
                        disabled={actionLoading[container.id] === 'restart'}
                        className="bg-yellow-500 hover:bg-yellow-600 px-2 py-1 rounded shadow disabled:opacity-50"
                      >
                        {actionLoading[container.id] === 'restart' ? 'Restarting...' : '🔁 Restart'}
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => onAction(container.id, 'remove')}
                    disabled={actionLoading[container.id] === 'remove'}
                    className="bg-gray-600 hover:bg-gray-700 px-2 py-1 rounded shadow disabled:opacity-50"
                  >
                    {actionLoading[container.id] === 'remove' ? 'Removing...' : '🗑 Remove'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContainerCategory;
