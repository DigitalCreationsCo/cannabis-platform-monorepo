/* eslint-disable @typescript-eslint/naming-convention */

import { type User } from './user.types';

interface ImageObject {
	edge_color_set: boolean;
	edge_color: string;
	url: string;
	original: Record<string, any>;
	crop_mask: Record<string, any>;
	aspect_ratio: number;
	id: string;
}

interface UrgencySignals {
	messages: any[];
	categories: any[];
}

interface Dedup {
	count: number;
	hash: string;
}

interface PrimaryVenue {
	_type: string;
	name: string;
	venue_profile_id: string | null;
	address: {
		address_1: string;
		address_2?: string;
		city: string;
		region: string;
		postal_code: string;
		longitude: string;
		latitude: string;
		location?: [number, number];
	};
	venue_profile_url: string;
	id: string;
}

interface TicketInfo {
	price: string;
}

export interface Event {
	id: string;
	eventbrite_event_id: string;
	eid: string;
	external_id: string;
	image: ImageObject;
	timezone: string;
	location?: string;
	tickets_url: string;
	ticket: TicketInfo;
	urgency_signals: UrgencySignals;
	tickets_by: string;
	primary_organizer_id: string;
	primary_organizer_slug?: string;
	primary_organizer_name?: string;
	dedup: Dedup;
	num_children: number;
	debug_info: Record<string, any>;
	parent_url: string | null;
	hide_end_date: boolean;
	start_date: string;
	end_time: string;
	_type: string;
	end_date: string;
	tags: Record<string, any>[];
	start_time: string;
	primary_venue: PrimaryVenue;
	full_description: string | null;
	image_id: string;
	is_protected_event: boolean;
	is_cancelled: boolean | null;
	primary_venue_id: string;
	checkout_flow: string;
	series_id: string | null;
	name: string;
	language: string;
	url: string;
	hide_start_date: boolean;
	summary: string;
	is_online_event: boolean;
	published: string;
	rating: number;
	comments: EventComment[];
	is_new: boolean;
	attendees: Attendee[];
}

export type Attendee = Pick<User, 'username' | 'name' | 'id' | 'image'> & {
	rsvpDate: Date | string;
	isPurchased: boolean;
};

export type EventJobLocation = {
	location: string;
};

export type EventComment = {
	comment: string;
	created_at: string;
	userId: string;
	username: string;
};
