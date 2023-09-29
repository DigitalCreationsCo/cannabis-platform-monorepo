import prisma from './db/prisma';

/*
 * Session Data Access functions
 *
 * findSessionByHandle
 * createSession
 * updateExpireSession
 * deleteSessionByHandle
 */

export async function findSessionByHandle(sessionHandle: string) {
	try {
		return await prisma.session.findUnique({
			where: {
				sessionHandle,
			},
			include: {
				user: true,
			},
		});
	} catch (error: any) {
		console.error(error);
		throw new Error(error);
	}
}

export async function createSession(
	sessionHandle: string,
	sessionPayload: SessionPayload,
	expires: number,
) {
	try {
		console.info(
			'create session args: ',
			sessionHandle,
			sessionPayload,
			expires,
		);
		return await prisma.session.create({
			data: {
				sessionHandle,
				email: sessionPayload.email,
				username: sessionPayload.username,
				expires: new Date(),
				user: {
					connect: { id: sessionPayload.userId },
				},
			},
		});
	} catch (error: any) {
		console.error(error);
		throw new Error(error);
	}
}

export async function updateExpireSession(
	sessionHandle: string,
	expires: number,
) {
	try {
		return await prisma.session.update({
			where: {
				sessionHandle,
			},
			data: {
				expires: new Date(expires),
			},
		});
	} catch (error: any) {
		console.error(error);
		throw new Error(error);
	}
}

export async function deleteSessionByHandle(sessionHandle: string) {
	try {
		return await prisma.session.delete({
			where: {
				sessionHandle,
			},
		});
	} catch (error: any) {
		console.error(error);
		throw new Error(error);
	}
}

export type SessionPayload = {
	username: string;
	userId: string;
	email: string;
};
