import type { Project } from '@/lib/abi';

type Props = {
  project: Project;
};

export function ProjectCard({ project }: Props) {
  const date = new Date(Number(project.createdAt) * 1000).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="border border-gray-200 rounded-lg p-5 flex flex-col gap-2 hover:shadow-sm transition-shadow bg-white">
      <div className="flex items-start justify-between gap-2">
        <h2 className="font-semibold text-gray-900">{project.name}</h2>
        <span className="text-xs text-gray-400 shrink-0 mt-0.5">{date}</span>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed">{project.description}</p>
      {project.url && (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:underline mt-1 break-all"
        >
          {project.url}
        </a>
      )}
    </div>
  );
}
