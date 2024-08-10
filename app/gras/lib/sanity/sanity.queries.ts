/* eslint-disable @typescript-eslint/naming-convention */
import type { PortableTextBlock } from '@portabletext/types';
import type { ImageAsset } from '@sanity/types';
import groq from 'groq';

const postFields = groq`
  _id,
  _type,
  title,
  _createdAt,
  _updatedAt,
  excerpt,
  mainImage,
  "mainImageAsset": mainImage.asset->,
  shareImage,
  body,
  "slug": slug.current,
  "author": author->{name, picture},
  "categories": categories[]->title,
  isPublishedInNewsLetter,
  isPublishedToSocialMedia,
  contentUrl,
  `;

export const settingsQuery = groq`*[_type == "settings"][0]`;

export const postsQuery = groq`
*[_type == "post"] | order(_createdAt desc, _updatedAt desc) {
  ${postFields}
}`;

export const businessPostsQuery = groq`
*[_type == "post" && categories[]->title == "Business"] | order(_createdAt desc, _updatedAt desc) {
  ${postFields}
}`;

export const postAndMoreStoriesQuery = groq`
{
  "post": *[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
    body,
    ${postFields}
  },
  "morePosts": *[_type == "post" && slug.current != $slug] | order(_createdAt desc, _updatedAt desc) [0...2] {
    body,
    ${postFields}
  }
}`;

export const businessPostAndMoreStoriesQuery = groq`
{
  "post": *[_type == "post" && slug.current == $slug && categories[]->title == "Business"] | order(_updatedAt desc) [0] {
	body,
	${postFields}
  },
  "morePosts": *[_type == "post" && slug.current != $slug && categories[]->title == "Business"] | order(_createdAt desc, _updatedAt desc) [0...2] {
	body,
	${postFields}
  }
}`;

export const postSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)][].slug.current
  `;

export const businessPostSlugsQuery = groq`
  *[_type == "post" && defined(slug.current) && categories[]->title == "Business"][].slug.current
  `;

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0]{ ${postFields} }`;

export const postByIdQuery = groq`*[_type == "post" && _id == $_id][0]{ ${postFields} }`;

export const categoryStringsQuery = groq`*[_type == 'category']{ title }[].title`;

export const nonPublishedPostsQuery = groq`*[_type == 'post' && (!defined(isPublishedInNewsLetter) || isPublishedInNewsLetter == false)][0...$count]{ 
  _id, 
  title,
  _createdAt,
  _updatedAt,
  excerpt,
  "mainImage": mainImage.asset->url,
  "slug": slug.current,
  "author": author->{name, picture},
  "categories": categories[]->title,
  contentUrl,
}`;

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
	mainImageAsset: ImageAsset;
	body: PortableTextBlock[];
	shareImage: any;
	categories: string[];
	isPublishedInNewsLetter: boolean;
	isPublishedToSocialMedia: boolean;
	contentUrl?: string;
}

export interface Settings {
	title?: string;
	description?: any[];
	ogImage?: {
		title?: string;
	};
}

export interface StrainOfTheWeek {
	_type: 'strainOfTheWeek';
	_id: string;
	title: string;
	image: ImageAsset;
	testimonial1: string;
	testimonial2: string;
	flavorProfile: string;
	ratings: {
		flavor: number;
		stink: number;
		smoke: number;
		sensation: number;
	};
	seoTitle: string;
	seoDescription: string;
	seoKeywords: string[];
}
