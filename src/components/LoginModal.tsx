import { useState } from "react";
import { FlexBetween } from "../styles/basic.styles";
import { SessionDiv } from "../styles/form.styles";
import ModalComponent from "./ModalComponent";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Spinner } from "react-bootstrap";
import { displayError, displaySuccess } from "../utils/display";
import authService from "../redux/auth/authService";
import { useAppSelector } from "../utils/hooks";

const LoginModal = ({
	open,
	toggleLogin,
}: {
	open: boolean;
	toggleLogin: (arg: boolean) => void;
}) => {
	const { user } = useAppSelector((state) => state.auth);

	const [showPassword, setShowPassword] = useState(false);
	const [password, setPassword] = useState("");
	const [load, setLoad] = useState(false);

	const loginHandler = async () => {
		try {
			setLoad(true);
			const res = await authService.login({
				email: user.email,
				password,
			});
			localStorage.setItem("@accesstoken", res?.accessToken);
			setLoad(false);
			toggleLogin(false);
			displaySuccess("Logged In!", "Session is now active");
		} catch (err) {
			displayError(err, true);
			setLoad(false);
		}
	};

	return (
		<ModalComponent open={open} close={() => toggleLogin(false)}>
			<SessionDiv>
				<div>
					<h5 className="mb-4">Session Expired! Enter Password.</h5>
					<FlexBetween>
						<label>Password</label>
						<button
							onClick={() => setShowPassword(!showPassword)}
							type="button"
							className="button"
						>
							{!showPassword ? <FaRegEye /> : <FaRegEyeSlash />}

							<span>{!showPassword ? "Show" : "Hide"} </span>
						</button>
					</FlexBetween>
					<input
						type={showPassword ? "text" : "password"}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						disabled={load}
					/>
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
						<span>Login</span>
					</button>
				</div>
			</SessionDiv>
		</ModalComponent>
	);
};

export default LoginModal;
