/* eslint-disable sonarjs/no-duplicated-branches */
/* eslint-disable sonarjs/no-all-duplicated-branches */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { type ArticleTag, type ArticleWithDetails } from '@cd/data-access';
import {
	createAsyncThunk,
	createSlice,
	type PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { type AppState } from '../types';
import { isEmpty, reconcileStateArray, urlBuilder } from '../utils';

export const getLatestArticles = createAsyncThunk(
	'blog/getLatestArticles',
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async (_, { rejectWithValue }) => {
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
	articles: Record<ArticleTag, ArticleWithDetails[]>;
	dispensaryGuides: ArticleWithDetails[];
	isLoading: boolean;
	isSuccess: boolean;
	isError: boolean;
	errorMessage: string;
};

const initialState: BlogStateProps = {
	articles: {},
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
					saveArticlesByTag(state.articles, articles);
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
export const selectBlogsByTag = (tag: ArticleTag) => (state: AppState) =>
	(state.blog.articles[tag] || []) as ArticleWithDetails[];
export const selectBlogTags = (state: AppState) =>
	Object.keys(state.blog.articles);

export function saveArticlesByTag(
	_articlesInState: Record<ArticleTag, ArticleWithDetails[]>,
	_articles: ArticleWithDetails[],
) {
	// create a map of new articles by tag
	const tagMap = new Map<ArticleTag, ArticleWithDetails[]>();
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
		if (!isEmpty(_articlesInState[tag]))
			_articlesInState[tag] = reconcileStateArray(
				_articlesInState[tag],
				tagMap.get(tag),
			);
		else _articlesInState[tag] = tagMap.get(tag);
	});
	return _articlesInState;
}
