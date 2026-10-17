/**
 * Seeds Postgres from the same TypeScript content the static site renders, so
 * the two never drift. Run with:  npm run prisma:seed
 * (requires DATABASE_URL and `npx prisma migrate dev` first)
 */
import { PrismaClient, BuildingStatus } from '@prisma/client';
import { AMENITIES } from '../src/data/amenities';
import { PROJECTS } from '../src/data/projects';
import { NEWS } from '../src/data/news';
import { SITE } from '../src/data/site';

const prisma = new PrismaClient();

const STATUS: Record<string, BuildingStatus> = {
  delivered: BuildingStatus.DELIVERED,
  'under-construction': BuildingStatus.UNDER_CONSTRUCTION,
  upcoming: BuildingStatus.UPCOMING,
};

async function main() {
  for (const project of PROJECTS) {
    const building = await prisma.building.upsert({
      where: { slug: project.slug },
      update: {},
      create: {
        slug: project.slug,
        name: project.name,
        type: project.category,
        headline: project.headline,
        summary: project.summary,
        description: project.description.join('\n\n'),
        address: SITE.address,
        phone: SITE.uan,
        status: STATUS[project.status] ?? BuildingStatus.UNDER_CONSTRUCTION,
        block: project.block,
        unitTypes: project.unitTypes,
        features: [...project.features, ...(project.amenityFeatures ?? [])],
        positionX: project.massing.position[0],
        positionZ: project.massing.position[1],
        footprintW: project.massing.footprint[0],
        footprintD: project.massing.footprint[1],
        towers: project.massing.towers,
        floors: project.massing.floors,
        unbuilt: project.massing.unbuilt ?? false,
      },
    });

    // Gallery slots seed as captions with an empty url until photography lands.
    for (const [index, image] of project.gallery.entries()) {
      await prisma.image.upsert({
        where: { id: index + project.slug.length * 1000 },
        update: {},
        create: {
          id: index + project.slug.length * 1000,
          url: image.src ?? '',
          caption: image.caption,
          sortOrder: index,
          buildingId: building.id,
        },
      });
    }

    for (const [index, link] of project.links.entries()) {
      await prisma.news.upsert({
        where: { id: index + project.slug.length * 100 },
        update: {},
        create: {
          id: index + project.slug.length * 100,
          title: link.label,
          link: link.href,
          source: 'nayanazimabad.com',
          summary: `${link.kind} for ${project.name}`,
          buildingId: building.id,
        },
      });
    }
  }

  // Amenities are community-wide, so buildingId stays null.
  for (const amenity of AMENITIES) {
    await prisma.amenity.upsert({
      where: { slug: amenity.id },
      update: {},
      create: {
        slug: amenity.id,
        name: amenity.name,
        kind: amenity.kind,
        description: amenity.description,
        block: amenity.block,
        detailUnspecified: amenity.detailUnspecified,
        positionX: amenity.position[0],
        positionZ: amenity.position[1],
        footprintW: amenity.footprint[0],
        footprintD: amenity.footprint[1],
      },
    });
  }

  for (const [index, item] of NEWS.entries()) {
    await prisma.news.upsert({
      where: { id: 90_000 + index },
      update: {},
      create: {
        id: 90_000 + index,
        title: item.title,
        link: item.href,
        source: item.source,
        summary: item.summary,
        publishedAt: item.date ? new Date(item.date) : null,
      },
    });
  }

  console.info(`Seeded ${PROJECTS.length} buildings, ${AMENITIES.length} amenities.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
