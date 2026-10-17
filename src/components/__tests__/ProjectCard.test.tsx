import { render, screen } from '@testing-library/react';
import { ProjectCard } from '@/components/ProjectCard';
import { getProject } from '@/data/projects';

describe('ProjectCard', () => {
  const project = getProject('signature-tower')!;

  it('renders the name, headline and summary', () => {
    render(<ProjectCard project={project} />);
    expect(screen.getByRole('heading', { name: project.name })).toBeInTheDocument();
    expect(screen.getByText(project.headline)).toBeInTheDocument();
    expect(screen.getByText(project.summary)).toBeInTheDocument();
  });

  it('links to the detail page', () => {
    render(<ProjectCard project={project} />);
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      expect(link).toHaveAttribute('href', `/projects/${project.slug}`);
    }
  });

  it('labels the status for readers', () => {
    render(<ProjectCard project={project} />);
    expect(screen.getByText('Under construction')).toBeInTheDocument();
  });

  it('describes the generated elevation instead of a photo', () => {
    render(<ProjectCard project={project} />);
    expect(
      screen.getByRole('img', { name: `Illustrative elevation of ${project.name}` }),
    ).toBeInTheDocument();
  });
});
