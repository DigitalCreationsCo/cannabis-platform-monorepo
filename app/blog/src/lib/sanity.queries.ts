/* eslint-disable @typescript-eslint/naming-convention */
import type { PortableTextBlock } from '@portabletext/types';
import type { ImageAsset } from '@sanity/types';
import groq from 'groq';

const postFields = groq`
  _id,
  _type,
  title,
  date,
  _updatedAt,
  excerpt,
  mainImage,
  shareImage,
  body,
  "slug": slug.current,
  "author": author->{name, picture},
  "categories": categories[]->title
  `;

export const settingsQuery = groq`*[_type == "settings"][0]`;

export const postsQuery = groq`
*[_type == "post"] | order(date desc, _updatedAt desc) {
  ${postFields}
}`;

export const postAndMoreStoriesQuery = groq`
{
  "post": *[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${postFields}
  },
  "morePosts": *[_type == "post" && slug.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    content,
    ${postFields}
  }
}`;

export const postSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)][].slug.current
  `;

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0]{ ${postFields} }`;

export const categoryStringsQuery = groq`*[_type == 'category']{ title }[].title`;

export interface Author {
	name?: string;
	picture?: any;
}

export interface Post {
	_type: 'post';
	_id: string;
	_createdAt: string;
	_updatedAt?: string;
	title?: string;
	slug: string;
	excerpt?: string;
	author?: Author;
	mainImage: ImageAsset;
	body: PortableTextBlock[];
	date?: string;
	shareImage: ImageAsset;
	categories: string[];
}

export interface Settings {
	title?: string;
	description?: any[];
	ogImage?: {
		title?: string;
	};
}
