import { useEffect, useState } from "react";
import { LoadingScreen } from "../../styles/landing.styles";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/bluepilo.svg";
import { generateId } from "../../utils/data";
import { useAppDispatch } from "../../utils/hooks";
import { createCart } from "../../redux/cart/cartSlice";

const Loading = () => {
	const dispatch = useAppDispatch();

	const navigate = useNavigate();

	const [progress, setProgress] = useState(0);

	const goToDashboard = () => {
		const id = generateId();
		dispatch(createCart(id));
		navigate(`/app/pos/${id}`);
	};

	useEffect(() => {
		let ran = false;
		const id = setInterval(() => {
			setProgress((p) => {
				if (p >= 100 && !ran) {
					ran = true;
					clearInterval(id);
					goToDashboard();
					return 100;
				}
				return p + 5;
			});
		}, 500);
		return () => clearInterval(id);
	}, []);

	return (
		<LoadingScreen val={progress}>
			{progress > 81 ? (
				<div className="load-image">
					<img src={Logo} />
				</div>
			) : (
				<>
					<div className="load-div">
						<h1>
							{progress > 80
								? 80
								: progress > 70
								? 70
								: progress > 50
								? 50
								: progress > 40
								? 40
								: 10}
						</h1>
						<div className="load">
							{progress > 80
								? "Getting your store ready"
								: progress > 70
								? "Authenticating User"
								: progress > 50
								? "Activating Hybrid Sync"
								: progress > 40
								? "Checking Network"
								: "Loading App"}
						</div>
					</div>
					<div className="content-div">
						<h3>Bluepilo POS Hybrid</h3>
						<p>
							Sell anytime, anywhere — our Hybrid Point of Sales
							works online and offline. Get instant sync for
							reports, inventory, and customers. Connect with the
							Hybrid Code Connector and download the app now from
							the Bluepilo website.
						</p>
					</div>
				</>
			)}
		</LoadingScreen>
	);
};

export default Loading;
