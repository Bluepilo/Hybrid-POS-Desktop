import { BgStyles } from "../../styles/landing.styles";
import Logo from "../../assets/images/bluepilo.svg";
import { FaQuestionCircle, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { FlexBetween } from "../../styles/basic.styles";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { login, loginOffline } from "../../redux/auth/authSlice";
import { Spinner } from "react-bootstrap";
import { generateId } from "../../utils/data";
import { hasInternet } from "../../utils/internet";

const Auth = () => {
	const dispatch = useAppDispatch();

	const { load, user, shopInfo } = useAppSelector((state) => state.auth);
	const { cartItems } = useAppSelector((state) => state.cart);

	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [connected, setConnected] = useState(true);

	useEffect(() => {
		nextNav();
	}, [user]);

	useEffect(() => {
		checkIfInternet();
	}, []);

	const loginHandler = async () => {
		if (connected) {
			dispatch(login({ email, password }));
		} else {
			dispatch(loginOffline({ email, password }));
		}
	};

	const checkIfInternet = async () => {
		if (await hasInternet()) {
			setConnected(true);
		} else {
			setConnected(false);
		}
	};

	const nextNav = () => {
		if (user?.userId) {
			if (shopInfo?.id) {
				const id = generateId();
				const posId = cartItems?.length > 0 ? cartItems[0].cartId : id;
				navigate(`/app/pos/${posId}`);
			} else {
				navigate("/connect");
			}
		}
	};

	return !user?.userId ? (
		<BgStyles>
			<div className="log-box">
				<div className="logo">
					<img src={Logo} alt="Logo" />
				</div>
				<div className="hint">
					<button>
						<FaQuestionCircle />
						<span>Hint</span>
					</button>
				</div>
				<h6 className="title">Sign In</h6>
				<div className={`status ${connected}`}>
					<i />
					<span>{connected ? "Online" : "Offline"}</span>
				</div>
				<div className="form">
					<div>
						<label>Email/Username</label>
						<input
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							disabled={load}
						/>
					</div>
					<div>
						<FlexBetween>
							<label>Password</label>
							<button
								onClick={() => setShowPassword(!showPassword)}
								type="button"
								className="button"
							>
								{!showPassword ? (
									<FaRegEye />
								) : (
									<FaRegEyeSlash />
								)}

								<span>{!showPassword ? "Show" : "Hide"} </span>
							</button>
						</FlexBetween>
						<input
							type={showPassword ? "text" : "password"}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							disabled={load}
						/>
					</div>
					<button
						className="wide"
						onClick={loginHandler}
						disabled={load}
					>
						{load && (
							<Spinner
								animation="border"
								color={"#FFF"}
								style={{ marginRight: "10px" }}
								size="sm"
							/>
						)}
						<span>Sign In</span>
					</button>
				</div>
				<div className="others">
					<p>
						By continuing, you agree to the{" "}
						<a href="#">Terms of use and Privacy Policy.</a>
					</p>
				</div>
			</div>
		</BgStyles>
	) : (
		<></>
	);
};

export default Auth;
