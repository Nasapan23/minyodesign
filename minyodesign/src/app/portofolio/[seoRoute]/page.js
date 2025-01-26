import path from 'path';
import fs from 'fs/promises';
import ProjectClientComponent from './ProjectClientController';

async function getProjectData(seoRoute) {
  const filePath = path.join(process.cwd(), 'data', 'projects.json');
  const data = await fs.readFile(filePath, 'utf-8');
  const projects = JSON.parse(data);
  return projects.find((project) => project.seoRoute === seoRoute);
}

export async function generateStaticParams() {
  const filePath = path.join(process.cwd(), 'data', 'projects.json');
  const data = await fs.readFile(filePath, 'utf-8');
  const projects = JSON.parse(data);
  return projects.map((project) => ({
    seoRoute: project.seoRoute,
  }));
}

export default async function ProjectPage({ params }) {
  const projectData = await getProjectData(params.seoRoute);

  if (!projectData) {
    return <div>Project not found</div>;
  }

  return (
    <div className="relative bg-gradient-to-b from-blue-200 via-blue-300 to-blue-400 min-h-screen">
      <ProjectClientComponent projectData={projectData} />
    </div>
  );
}
