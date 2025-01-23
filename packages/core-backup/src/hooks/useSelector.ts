"use client"
import {
	type TypedUseSelectorHook,
	useDispatch,
	useSelector,
} from 'react-redux';
import { type AppState, type AppDispatch } from '../types/redux.types';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
