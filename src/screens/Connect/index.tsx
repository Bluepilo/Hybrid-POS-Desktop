import { BgStyles } from "../../styles/landing.styles";
import Logo from "../../assets/images/bluepilo.svg";
import { FaQuestionCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import ProgressBar from "../../components/ProgressBar";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { connectShop } from "../../redux/auth/authSlice";
import { Spinner } from "react-bootstrap";

const Connect = () => {
	const navigate = useNavigate();

	const dispatch = useAppDispatch();

	const { load } = useAppSelector((state) => state.auth);

	const [code, setCode] = useState("");
	const [connecting, setConnecting] = useState(false);
	const [progress, setProgress] = useState(0);

	const connectHandler = async () => {
		if (code) {
			let res = await dispatch(connectShop()).unwrap();
			if (res?.id) {
				setConnecting(true);
			}
		}
	};

	useEffect(() => {
		if (connecting) {
			const id = setInterval(() => {
				setProgress((p) => {
					if (p >= 100) {
						clearInterval(id);
						navigate("/load");
						return 100;
					}
					return p + 5;
				});
			}, 500);
			return () => clearInterval(id);
		}
	}, [connecting]);

	return (
		<BgStyles>
			<div className="log-box">
				<div className="logo">
					<img src={Logo} alt="Logo" />
				</div>
				{connecting ? (
					<>
						<ProgressBar value={progress} />
						<p
							style={{
								textAlign: "center",
								color: "#000",
								fontWeight: 700,
								marginTop: "20px",
							}}
						>
							Connecting
						</p>
					</>
				) : (
					<>
						<div className="hint">
							<button>
								<FaQuestionCircle />
								<span>Hint</span>
							</button>
						</div>
						<div className="content">
							<h3>Connect the App to the Cloud</h3>
							<p>
								Bluepilo Inventory works even when the internet
								doesn’t. Keep your business running and your
								sales flowing—no downtime, no lost money.
							</p>
						</div>
						<div className="form">
							<input
								type="text"
								value={code}
								onChange={(e) => setCode(e.target.value)}
								placeholder="Insert Connection Code"
								className="right"
							/>
							<button onClick={connectHandler} disabled={load}>
								{load && (
									<Spinner
										animation="border"
										color={"#FFF"}
										style={{ marginRight: "10px" }}
										size="sm"
									/>
								)}
								<span>Connect</span>
							</button>
						</div>
						<div className="others">
							<p>You do not have an account?</p>
							<button>Sign Up</button>
						</div>
					</>
				)}
			</div>
		</BgStyles>
	);
};

export default Connect;
