import { createAsyncThunk } from '@reduxjs/toolkit';
import { axios } from '../../axiosInstance';
import { type AppState, type ThunkArgumentsType } from '../../types';
import { urlBuilder } from '../../utils';

/**
 * update driver session status in db
 */
const updateOnlineStatus = createAsyncThunk<
	{ success?: boolean; isOnline: boolean },
	boolean,
	{ extra: ThunkArgumentsType; state: AppState }
>('driver/updateOnlineStatus', async (onlineStatus, thunkAPI) => {
	try {
		const state = thunkAPI.getState() as AppState;
		const id = state.driver.driver.user.id;
		const token = state.driver.token;
		const status = state.driver.driver.driverSession.isOnline;
		// if updateStatus does not match the current status, then update the status in db
		// otherwise ignore

		let response;
		if (status !== onlineStatus) {
			response = await axios.post(
				urlBuilder.main.driverUpdateStatus(),
				{
					id,
					onlineStatus,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (response.data.success === 'false')
				throw new Error(response.data.error);
		}

		return {
			success: response?.data.success || 'true',
			isOnline: onlineStatus,
		};
	} catch (error) {
		console.error('updateOnlineStatus error: ', error.message);
		return thunkAPI.rejectWithValue({
			isOnline: !onlineStatus,
			error: error.message,
		});
	}
});

export { updateOnlineStatus }