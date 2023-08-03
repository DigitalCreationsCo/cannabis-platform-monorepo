// @ts-nocheck

import { ArticleWithDetails } from '@cd/data-access';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { urlBuilder } from '../../utils';
import { AppState } from '../types/reduxTypes';

export const getLatestNews = createAsyncThunk(
	'blog/getLatestNews',
	async (_, { getState, rejectWithValue }) => {
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
			console.error('getLatestNews: ', error);
			return rejectWithValue('Could not get latest news articles');
		}
	},
);

export type BlogStateProps = {
	news: ArticleWithDetails[];
	dispensary_guides: ArticleWithDetails[];
	driver_guides: ArticleWithDetails[];
	isLoading: boolean;
	isSuccess: boolean;
	isError: boolean;
	errorMessage: string;
};

const initialState: BlogStateProps = {
	news: [],
	dispensary_guides: [],
	driver_guides: [],
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
			getLatestNews.fulfilled,
			(state, { payload }: PayloadAction<ArticleWithDetails[]>) => {
				const articles = payload;
				if (articles.length > 0) {
					articles.forEach((article) => {
						console.info('state before reconcile: ', state.news);

						const index = state.news.findIndex((i) => i.id === article.id);
						if (index === -1) state.news = [...state.news, article];
						else state.news[index] = article;

						console.info('state after reconcile: ', state.news);
					});
				}
				state.isLoading = false;
				state.isSuccess = true;
				state.isError = false;
			},
		),
			builder.addCase(getLatestNews.pending, (state) => {
				state.isLoading = true;
			}),
			builder.addCase(getLatestNews.rejected, (state, { payload }) => {
				const error = payload;
				state.errorMessage = error;
				console.error('get latest news error: ', error);
				state.isLoading = false;
				state.isSuccess = false;
				state.isError = true;
			});
	},
});

export const blogActions = {
	getLatestNews,
	...blogSlice.actions,
};

export const blogReducer = blogSlice.reducer;

export const selectBlogState = (state: AppState) => state.blog;
