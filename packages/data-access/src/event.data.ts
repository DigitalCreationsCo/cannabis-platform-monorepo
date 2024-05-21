/* eslint-disable @typescript-eslint/naming-convention */
type ImageObject = {
	edge_color_set: boolean;
	edge_color: string;
	url: string;
	original: Record<string, any>;
	crop_mask: Record<string, any>;
	aspect_ratio: number;
	id: string;
};

type UrgencySignals = {
	messages: any[];
	categories: any[];
};

type Dedup = {
	count: number;
	hash: string;
};

type PrimaryVenue = {
	_type: string;
	name: string;
	venue_profile_id: string | null;
	address: Record<string, any>;
	venue_profile_url: string;
	id: string;
};

export type Event = {
	image: ImageObject;
	timezone: string;
	id: string;
	tickets_url: string;
	urgency_signals: UrgencySignals;
	tickets_by: string;
	primary_organizer_id: string;
	dedup: Dedup;
	num_children: number;
	debug_info: Record<string, any>;
	parent_url: string | null;
	hide_end_date: boolean;
	start_date: string;
	end_time: string;
	_type: string;
	end_date: string;
	tags: Array<Record<string, any>>;
	eventbrite_event_id: string;
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
	eid: string;
	published: string;
};
