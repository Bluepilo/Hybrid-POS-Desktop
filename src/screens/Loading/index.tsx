import { useEffect, useRef, useState } from "react";
import { LoadingScreen } from "../../styles/landing.styles";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/bluepilo.svg";
import { generateId } from "../../utils/data";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { createCart } from "../../redux/cart/cartSlice";
import { displayError } from "../../utils/display";
import appService from "../../redux/app/appService";
import { upsertCustomers, upsertProducts } from "../../utils/db";

const Loading = () => {
	const dispatch = useAppDispatch();

	const navigate = useNavigate();

	const { shopInfo } = useAppSelector((state) => state.auth);

	const [progress, setProgress] = useState(0);

	let id = useRef<any>(null);

	const goToDashboard = () => {
		const id = generateId();
		dispatch(createCart(id));
		navigate(`/app/pos/${id}`);
	};

	useEffect(() => {
		uploadProducts();
		return () => clearInterval(id.current);
	}, []);

	useEffect(() => {
		if (progress >= 100) {
			goToDashboard();
		}
	}, [progress]);

	const uploadProducts = async () => {
		try {
			let res = await appService.fetchProducts(shopInfo?.id);
			if (res?.rows?.length > 0) {
				await upsertProducts(res.rows);
			}
			let resC = await appService.fetchCustomers(shopInfo?.id);
			if (resC?.rows?.length > 0) {
				await upsertCustomers(resC.rows, false);
			}
			let resS = await appService.fetchCustomers(shopInfo?.id);
			if (resS?.rows?.length > 0) {
				await upsertCustomers(resS.rows, true);
				runInterval();
			}
		} catch (err) {
			displayError(
				"There was an error updating your stocks. Please Contact Admin",
				true
			);
		}
	};

	const runInterval = () => {
		let ran = false;
		id.current = setInterval(() => {
			setProgress((p) => {
				if (p >= 100) {
					ran = true;
					clearInterval(id.current);
					return 100;
				}
				return p + 5;
			});
		}, 500);
	};

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
