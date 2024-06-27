import { Role } from '@cd/data-access';

type RoleType = (typeof Role)[keyof typeof Role];
export type Action = 'create' | 'update' | 'read' | 'delete' | 'leave' | 'send';
export type Resource =
	| 'team'
	| 'team_member'
	| 'team_invitation'
	| 'team_sso'
	| 'team_dsync'
	| 'team_audit_log'
	| 'team_webhook'
	| 'team_payments'
	| 'team_api_key'
	| 'team_daily_deals'
	| 'team_customers';

type RolePermissions = {
	[role in RoleType]: Permission[];
};

export interface Permission {
	resource: Resource;
	actions: Action[] | '*';
}

export const availableRoles = [
	{
		id: Role.MEMBER,
		name: 'Member',
	},
	{
		id: Role.ADMIN,
		name: 'Admin',
	},
	{
		id: Role.OWNER,
		name: 'Owner',
	},
];

export const permissions: RolePermissions = {
	OWNER: [
		{
			resource: 'team',
			actions: '*',
		},
		{
			resource: 'team_member',
			actions: '*',
		},
		{
			resource: 'team_invitation',
			actions: '*',
		},
		{
			resource: 'team_sso',
			actions: '*',
		},
		{
			resource: 'team_dsync',
			actions: '*',
		},
		{
			resource: 'team_audit_log',
			actions: '*',
		},
		{
			resource: 'team_payments',
			actions: '*',
		},
		{
			resource: 'team_webhook',
			actions: '*',
		},
		{
			resource: 'team_api_key',
			actions: '*',
		},
		{ resource: 'team_daily_deals', actions: '*' },
		{ resource: 'team_customers', actions: '*' },
	],
	ADMIN: [
		{
			resource: 'team',
			actions: '*',
		},
		{
			resource: 'team_member',
			actions: '*',
		},
		{
			resource: 'team_invitation',
			actions: '*',
		},
		{
			resource: 'team_sso',
			actions: '*',
		},
		{
			resource: 'team_dsync',
			actions: '*',
		},
		{
			resource: 'team_audit_log',
			actions: '*',
		},
		{
			resource: 'team_webhook',
			actions: '*',
		},
		{
			resource: 'team_api_key',
			actions: '*',
		},
		{ resource: 'team_daily_deals', actions: '*' },
		{ resource: 'team_customers', actions: '*' },
	],
	MEMBER: [
		{
			resource: 'team',
			actions: ['read', 'leave'],
		},
		{
			resource: 'team_member',
			actions: ['read'],
		},
		{
			resource: 'team_invitation',
			actions: ['read'],
		},
		{
			resource: 'team_sso',
			actions: ['read'],
		},
		{
			resource: 'team_dsync',
			actions: ['read'],
		},
		{
			resource: 'team_audit_log',
			actions: ['read'],
		},
		{
			resource: 'team_webhook',
			actions: ['read'],
		},
		{
			resource: 'team_api_key',
			actions: ['read'],
		},
		{ resource: 'team_daily_deals', actions: ['read'] },
		{ resource: 'team_customers', actions: ['read'] },
	],
};
