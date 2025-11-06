import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";
import { displayError } from "../../utils/display";
import { getDB } from "../../utils/db";
import bcrypt from "bcryptjs";
import { syncDBShop } from "../../utils/db/dbUpdate";

const initialState = {
	user: null as any,
	load: false,
	shopInfo: null as any,
};

export const login = createAsyncThunk(
	"auth/login",
	async (data: any, thunkAPI: any) => {
		try {
			const { shopInfo } = thunkAPI.getState().auth;
			const res = await authService.login(data);
			localStorage.setItem("@accesstoken", res?.accessToken);

			const db = getDB();
			const passwordHash = await bcrypt.hash(data.password, 10);

			let user = res?.user;
			if (user) {
				await db.execute(
					`INSERT OR REPLACE INTO users (userId, name, loginId, password)
				VALUES (?, ?, ?, ?)`,
					[
						user.id,
						`${user.firstName} ${user.lastName}`,
						user.email,
						passwordHash,
					]
				);
			}
			if (shopInfo?.id) {
				await syncDBShop(shopInfo.id);
			}
			return { ...user, userId: user.id };
		} catch (error) {
			const message = displayError(error, true);
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const loginOffline = createAsyncThunk(
	"auth/loginOffline",
	async (data: any, thunkAPI) => {
		try {
			const db = getDB();

			const result: any[] = await db.select(
				"SELECT * FROM users WHERE loginId = ? LIMIT 1",
				[data.email]
			);
			if (result.length === 0) {
				thunkAPI.rejectWithValue("Invalid User Login");
				displayError("Invalid User Login", true);
				return;
			}

			const user = result[0];
			const match = await bcrypt.compare(
				data.password,
				user.passwordHash
			);

			if (!match) {
				thunkAPI.rejectWithValue("Invalid Password");
				displayError("Invalid Password", true);
			}

			return user;
		} catch (error) {
			const message = displayError(error, true);
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const connectShop = createAsyncThunk(
	"auth/connect",
	async (code: string, thunkAPI: any) => {
		try {
			const res = await authService.connectShop(code);
			if (res?.shop) {
				return {
					...res.shop,
					currency: res.business?.currency?.symbol,
				};
			} else {
				displayError("No Shop is connected.", true);
				return {};
			}
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
			localStorage.removeItem("@accesstoken");
			state.user = null;
			state.load = false;
		},
		clearShop: (state) => {
			state.shopInfo = null;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(login.pending, (state) => {
			state.load = true;
		});
		builder.addCase(login.fulfilled, (state, action) => {
			state.load = false;
			state.user = action.payload;
		});
		builder.addCase(login.rejected, (state) => {
			state.load = false;
		});
		builder.addCase(loginOffline.fulfilled, (state, action) => {
			state.load = false;
			state.user = action.payload;
		});
		builder.addCase(connectShop.pending, (state) => {
			state.load = true;
		});
		builder.addCase(connectShop.fulfilled, (state, action) => {
			state.load = false;
			state.shopInfo = action.payload;
		});
		builder.addCase(connectShop.rejected, (state) => {
			state.load = false;
		});
	},
});

export const { clearLoad, logoutFromStorage, clearShop } = authSlice.actions;

export default authSlice.reducer;
