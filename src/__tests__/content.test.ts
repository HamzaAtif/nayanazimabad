import { AMENITIES } from '@/data/amenities';
import { generateBungalows, generateTrees } from '@/data/masterplan';
import { NEWS } from '@/data/news';
import { PROJECTS, PROJECT_SLUGS, getProject } from '@/data/projects';
import { SITE } from '@/data/site';

describe('project content', () => {
  it('exposes every published project', () => {
    expect(PROJECTS.length).toBeGreaterThanOrEqual(7);
    expect(PROJECT_SLUGS).toContain('signature-tower');
  });

  it('has unique slugs', () => {
    expect(new Set(PROJECT_SLUGS).size).toBe(PROJECT_SLUGS.length);
  });

  it('gives every project the fields the detail page renders', () => {
    for (const project of PROJECTS) {
      expect(project.name.length).toBeGreaterThan(0);
      expect(project.headline.length).toBeGreaterThan(0);
      expect(project.summary.length).toBeGreaterThan(20);
      expect(project.features.length).toBeGreaterThan(0);
      expect(project.description.length).toBeGreaterThan(0);
      expect(['apartments', 'mixed-use', 'commercial']).toContain(project.category);
      expect(['delivered', 'under-construction', 'upcoming']).toContain(project.status);
    }
  });

  it('only links out over https', () => {
    for (const project of PROJECTS) {
      for (const link of project.links) {
        expect(link.href.startsWith('https://')).toBe(true);
      }
    }
  });

  it('places every project inside positive massing dimensions', () => {
    for (const project of PROJECTS) {
      const { footprint, towers, floors, position } = project.massing;
      expect(footprint[0]).toBeGreaterThan(0);
      expect(footprint[1]).toBeGreaterThan(0);
      expect(towers).toBeGreaterThanOrEqual(1);
      expect(floors).toBeGreaterThan(0);
      expect(Number.isFinite(position[0])).toBe(true);
      expect(Number.isFinite(position[1])).toBe(true);
    }
  });

  it('resolves a project by slug', () => {
    expect(getProject('rahat-residency-ii')?.name).toBe('Rahat Residency II');
    expect(getProject('does-not-exist')).toBeUndefined();
  });
});

describe('amenities and media', () => {
  it('has unique amenity ids', () => {
    expect(new Set(AMENITIES.map((a) => a.id)).size).toBe(AMENITIES.length);
  });

  it('flags facilities with no published description', () => {
    expect(AMENITIES.some((a) => a.detailUnspecified)).toBe(true);
  });

  it('links every media item over https', () => {
    for (const item of NEWS) {
      expect(item.href.startsWith('https://')).toBe(true);
    }
  });
});

describe('procedural masterplan', () => {
  it('generates housing deterministically', () => {
    const exclusions = PROJECTS.map((p) => ({
      position: p.massing.position,
      footprint: p.massing.footprint,
    }));
    const first = generateBungalows(exclusions);
    const second = generateBungalows(exclusions);
    expect(first.length).toBeGreaterThan(50);
    expect(first).toEqual(second);
  });

  it('does not drop bungalows on top of the towers', () => {
    const exclusions = PROJECTS.map((p) => ({
      position: p.massing.position,
      footprint: p.massing.footprint,
    }));
    for (const building of generateBungalows(exclusions)) {
      for (const { position, footprint } of exclusions) {
        const clearX =
          Math.abs(building.position[0] - position[0]) > footprint[0] / 2 + building.size[0] / 2;
        const clearZ =
          Math.abs(building.position[1] - position[1]) > footprint[1] / 2 + building.size[1] / 2;
        expect(clearX || clearZ).toBe(true);
      }
    }
  });

  it('plants trees along the boulevards', () => {
    expect(generateTrees().length).toBeGreaterThan(100);
  });
});

describe('site constants', () => {
  it('publishes the official contact details', () => {
    expect(SITE.uan).toBe('+92-21-111-511-611');
    expect(SITE.email).toBe('info@nayanazimabad.com');
    expect(SITE.uanHref).toBe('tel:+9221111511611');
  });
});
