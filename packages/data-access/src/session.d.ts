export declare function findSessionByHandle(sessionHandle: string): Promise<(import(".prisma/client").Session & {
    user: import(".prisma/client").User;
}) | null>;
export declare function createSession(sessionHandle: string, sessionPayload: SessionPayload, expires: number): Promise<import(".prisma/client").Session>;
export declare function updateExpireSession(sessionHandle: string, expires: number): Promise<import(".prisma/client").Session>;
export declare function deleteSessionByHandle(sessionHandle: string): Promise<import(".prisma/client").Session>;
export type SessionPayload = {
    username: string;
    userId: string;
    email: string;
};
//# sourceMappingURL=session.d.ts.map