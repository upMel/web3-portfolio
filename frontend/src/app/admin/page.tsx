'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Navbar } from '@/components/Navbar';
import { ProjectCard } from '@/components/ProjectCard';
import { useProjects, useIsOwner, useAddProject, useRemoveProject } from '@/hooks/usePortfolio';

export default function AdminPage() {
  const { isConnected } = useAccount();
  const isOwner = useIsOwner();
  const { projects, isLoading, refetch } = useProjects();

  const { addProject, isPending: isAdding, isConfirming: isAddConfirming, isSuccess: isAdded, error: addError } = useAddProject();
  const { removeProject, isPending: isRemoving, isConfirming: isRemoveConfirming, isSuccess: isRemoved } = useRemoveProject();

  const [form, setForm] = useState({ name: '', description: '', url: '' });

  useEffect(() => {
    if (isAdded || isRemoved) {
      refetch();
      setForm({ name: '', description: '', url: '' });
    }
  }, [isAdded, isRemoved, refetch]);

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <p className="text-gray-500 text-sm">Connect your wallet to access the admin panel.</p>
          <ConnectButton />
        </div>
      </div>
    );
  }

  if (!isOwner) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-32">
          <p className="text-red-500 text-sm">Access denied — this wallet is not the contract owner.</p>
        </div>
      </div>
    );
  }

  const isBusy = isAdding || isAddConfirming || isRemoving || isRemoveConfirming;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-10">Admin Panel</h1>

        {/* Add project form */}
        <section className="bg-white border border-gray-200 rounded-lg p-6 mb-10">
          <h2 className="font-semibold text-gray-800 mb-4">Add Project</h2>
          <div className="flex flex-col gap-3">
            <input
              className="border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              disabled={isBusy}
            />
            <textarea
              className="border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Description"
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              disabled={isBusy}
            />
            <input
              className="border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="URL (https://...)"
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
              disabled={isBusy}
            />

            {addError && (
              <p className="text-xs text-red-500">{addError.message}</p>
            )}

            <button
              className="bg-blue-600 text-white rounded px-4 py-2 text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isBusy || !form.name || !form.description}
              onClick={() => addProject(form.name, form.description, form.url)}
            >
              {isAdding ? 'Waiting for wallet...' : isAddConfirming ? 'Confirming...' : 'Add Project'}
            </button>

            {isAdded && (
              <p className="text-xs text-green-600">Project added successfully.</p>
            )}
          </div>
        </section>

        {/* Existing projects */}
        <section>
          <h2 className="font-semibold text-gray-800 mb-4">Existing Projects</h2>
          {isLoading && <p className="text-sm text-gray-400">Loading...</p>}
          {!isLoading && projects.length === 0 && (
            <p className="text-sm text-gray-400">No projects yet.</p>
          )}
          <div className="flex flex-col gap-4">
            {projects.map((project) => (
              <div key={project.id.toString()} className="flex gap-3 items-start">
                <div className="flex-1">
                  <ProjectCard project={project} />
                </div>
                <button
                  className="mt-1 shrink-0 text-xs text-red-500 hover:text-red-700 border border-red-200 rounded px-2 py-1 disabled:opacity-40"
                  disabled={isBusy}
                  onClick={() => removeProject(project.id)}
                >
                  {isRemoving || isRemoveConfirming ? '...' : 'Remove'}
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
