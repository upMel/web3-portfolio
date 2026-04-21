'use client';

import { Navbar } from '@/components/Navbar';
import { ProjectCard } from '@/components/ProjectCard';
import { useProjects } from '@/hooks/usePortfolio';

export default function Home() {
  const { projects, isLoading, isError } = useProjects();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Portfolio</h1>
          <p className="mt-2 text-gray-500 text-sm">Projects stored on-chain via the Portfolio smart contract.</p>
        </div>

        {isLoading && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-5 animate-pulse bg-white">
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-3" />
                <div className="h-3 bg-gray-200 rounded w-full mb-2" />
                <div className="h-3 bg-gray-200 rounded w-4/5" />
              </div>
            ))}
          </div>
        )}

        {isError && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            Could not load projects. Make sure the contract address is set and the network is correct.
          </div>
        )}

        {!isLoading && !isError && projects.length === 0 && (
          <div className="text-center py-24 text-gray-400 text-sm">
            No projects on-chain yet.
          </div>
        )}

        {!isLoading && !isError && projects.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id.toString()} project={project} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
