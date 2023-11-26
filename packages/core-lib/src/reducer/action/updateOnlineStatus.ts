import { createAsyncThunk } from '@reduxjs/toolkit';
import { axios } from '../../axiosInstance';
import { type AppState, type ThunkArgumentsType } from '../../types';
import { urlBuilder } from '../../utils';

/**
 * update driver session status in db
 */
export const updateOnlineStatus = createAsyncThunk<
	{ success?: boolean; isOnline: boolean },
	boolean,
	{ extra: ThunkArgumentsType; state: AppState }
>('driver/updateOnlineStatus', async (onlineStatus, thunkAPI) => {
	try {
		const state = thunkAPI.getState() as AppState;
		const id = state.driver.driver.user.id;
		const response = await axios.post(urlBuilder.main.driverUpdateStatus(), {
			id,
			onlineStatus,
		});
		console.log('updateOnlineStatus response: ', response.data);
		if (response.data.success === 'false') throw new Error(response.data.error);
		return {
			...response.data,
			success: 'true',
			isOnline: onlineStatus,
		};
	} catch (error) {
		console.error('updateOnlineStatus error: ', error.message);
		return thunkAPI.rejectWithValue({
			isOnline: onlineStatus,
			error: error.message,
		});
	}
});
