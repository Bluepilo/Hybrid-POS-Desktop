import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";
import { displayError } from "../../utils/display";

const initialState = {
	user: null as any,
	load: false,
};

export const login = createAsyncThunk(
	"auth/login",
	async (data: any, thunkAPI) => {
		try {
			const res = await authService.login(data);
			localStorage.setItem("@accesstoken", res?.accessToken);
			return res;
		} catch (error) {
			const message = displayError(error, true);
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
	try {
		thunkAPI.dispatch(logoutFromStorage());
		await authService.logout();
	} catch (error) {}
});

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		clearLoad: (state) => {
			state.load = false;
		},
		logoutFromStorage: (state) => {
			localStorage.removeItem("@savedtoken");
			state.user = null;
			state.load = false;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(login.pending, (state) => {
			state.load = true;
		});
		builder.addCase(login.fulfilled, (state, action) => {
			state.load = false;
			state.user = action.payload.user;
		});
		builder.addCase(login.rejected, (state) => {
			state.load = false;
		});
	},
});

export const { clearLoad, logoutFromStorage } = authSlice.actions;

export default authSlice.reducer;
