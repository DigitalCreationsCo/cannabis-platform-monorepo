/* eslint-disable sonarjs/no-duplicated-branches */
/* eslint-disable sonarjs/no-all-duplicated-branches */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { type ArticleType, type ArticleWithDetails } from '@cd/data-access';
import {
	createAsyncThunk,
	createSlice,
	type PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { type AppState } from '../types';
import { reconcileStateArray, urlBuilder } from '../utils';

export const getLatestArticles = createAsyncThunk(
	'blog/getLatestArticles',
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async (_, { dispatch, rejectWithValue }) => {
		try {
			const response = await axios.get(urlBuilder.main.blog(), {
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			});

			// ADD AXIOS REPSONSE TYPE TO INSTANCE CONFIG!
			if (response.data.success) return response.data.payload;
		} catch (error) {
			console.error('getLatestArticles: ', error);
			return rejectWithValue('Could not get latest articles');
		}
	},
);

export type BlogStateProps = {
	articles: Map<ArticleType, ArticleWithDetails[]>;
	dispensaryGuides: ArticleWithDetails[];
	isLoading: boolean;
	isSuccess: boolean;
	isError: boolean;
	errorMessage: string;
};

const initialState: BlogStateProps = {
	articles: new Map(),
	isLoading: false,
	isSuccess: false,
	isError: false,
	errorMessage: '',
};

export const blogSlice = createSlice({
	name: 'blog',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(
			getLatestArticles.fulfilled,
			(state, { payload }: PayloadAction<ArticleWithDetails[]>) => {
				const articles = payload;
				if (articles.length > 0) {
					saveArticlesByTag(articles);
				}
				state.isLoading = false;
				state.isSuccess = true;
				state.isError = false;
			},
		),
			builder.addCase(getLatestArticles.pending, (state) => {
				state.isLoading = true;
			}),
			builder.addCase(getLatestArticles.rejected, (state, { payload }) => {
				const error = payload;
				state.errorMessage = error;
				console.error('get latest articles error: ', error);
				state.isLoading = false;
				state.isSuccess = false;
				state.isError = true;
			});
	},
});

export const blogActions = {
	getLatestArticles,
	...blogSlice.actions,
};

export const blogReducer = blogSlice.reducer;

export const selectBlogState = (state: AppState) => state.blog;
export const selectBlogsByTag = (tag: ArticleType) => (state: AppState) =>
	state.blog.articles.get(tag);
export const selectBlogTags = (state: AppState) => [
	...state.blog.articles.keys(),
];

export function saveArticlesByTag(
	_articlesInState: Map<ArticleType, ArticleWithDetails[]>,
	_articles: ArticleWithDetails[],
) {
	// create a map of new articles by tag
	const tagMap = new Map<ArticleType, ArticleWithDetails[]>();
	_articles.forEach((article) => {
		const tag = article.tag;
		if (tagMap.has(tag)) {
			tagMap.get(tag).push(article);
		} else {
			tagMap.set(tag, [article]);
		}
	});
	// reconcile new articles with articles in state
	[tagMap.keys()].forEach((tag) => {
		if (_articlesInState.has(tag))
			_articlesInState.set(
				tag,
				reconcileStateArray(_articlesInState.get(tag), tagMap.get(tag)),
			);
		else _articlesInState.set(tag, tagMap.get(tag));
	});
	return _articlesInState;
}
