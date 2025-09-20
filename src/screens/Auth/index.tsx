import { BgStyles } from "../../styles/landing.styles";
import Logo from "../../assets/images/bluepilo.svg";
import { FaQuestionCircle, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { FlexBetween } from "../../styles/basic.styles";
import { useNavigate } from "react-router-dom";

const Auth = () => {
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const loginHandler = () => {
		navigate("/connect");
	};

	return (
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
				<div className="status">
					<i />
					<span>Online</span>
				</div>
				<div className="form">
					<div>
						<label>Email/Username</label>
						<input
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
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
						/>
					</div>
					<button className="wide" onClick={loginHandler}>
						Sign In
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
	);
};

export default Auth;
