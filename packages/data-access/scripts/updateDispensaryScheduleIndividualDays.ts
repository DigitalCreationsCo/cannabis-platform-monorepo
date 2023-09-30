import prisma from '../src/db/prisma';

(async () => {
	const allOrganizations = await prisma.organization.findMany({});

	for (const organization of allOrganizations) {
		await prisma.organization.update({
			where: { id: organization.id },
			data: {
				schedule: {
					createMany: {
						data: [
							{
								day: 'Monday',
							},
							{
								day: 'Tuesday',
							},
							{
								day: 'Wednesday',
							},
							{
								day: 'Thursday',
							},
							{
								day: 'Friday',
							},
							{
								day: 'Saturday',
							},
							{
								day: 'Sunday',
							},
						],
					},
				},
			},
		});
	}
	console.info('Done!');
})();
