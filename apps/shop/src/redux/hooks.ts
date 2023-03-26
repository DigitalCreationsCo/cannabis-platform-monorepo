import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './store';

// export type AppThunk<ReturnType = Dispatch<AnyAction>> = ThunkAction<
//     ReturnType,
//     RootState,
//     ThunkArgumentsType,
//     AnyAction
// >;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
