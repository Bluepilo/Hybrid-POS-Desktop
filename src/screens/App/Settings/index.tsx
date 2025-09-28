import { BsCloudUpload } from "react-icons/bs";
import Button from "../../../components/Button";
import { CardBox, InfoBox, SyncBox } from "../../../styles/basic.styles";
import { IoMdRefresh } from "react-icons/io";
import { upsertProducts } from "../../../utils/db";
import appService from "../../../redux/app/appService";
import { useAppSelector } from "../../../utils/hooks";

const Settings = () => {
	const { shopInfo } = useAppSelector((state) => state.auth);

	const syncData = async () => {
		try {
			let res = await appService.fetchProducts(shopInfo?.id);
			if (res?.rows?.length > 0) {
				await upsertProducts(res.rows);
			}
		} catch (err) {
			console.log(err, "eeeee");
		}
	};

	return (
		<div>
			<h3
				style={{
					color: "#666",
					fontWeight: "normal",
					marginTop: "10px",
				}}
			>
				Settings
			</h3>
			<div className="row mt-3">
				<div className="col-lg-6">
					<CardBox>
						<p>Organization Info</p>
						<div className="mb-2">
							<p
								style={{
									margin: "0",
									fontSize: "0.8rem",
									color: "#666",
								}}
							>
								Organisation Name
							</p>
							<h5 style={{ color: "#666" }}>Kenny AI Limited</h5>
						</div>
						<div className="mb-2">
							<p
								style={{
									margin: "0",
									fontSize: "0.8rem",
									color: "#666",
								}}
							>
								Business Name
							</p>
							<h5 style={{ color: "#666" }}>Subaru Limited</h5>
						</div>
						<div className="mb-4">
							<p
								style={{
									margin: "0",
									fontSize: "0.8rem",
									color: "#666",
								}}
							>
								Shop Name
							</p>
							<h5 style={{ color: "#666" }}>Ikeja Branch</h5>
						</div>
						<div className="col-md-6">
							<Button
								name="Disconnect from Online Store"
								onClick={syncData}
								border="red"
								bg="red"
							/>
						</div>
					</CardBox>
				</div>
				<div className="col-lg-6">
					<InfoBox>
						<div className="head">Customer Type</div>
						<div className="bdy">
							<span>Walk In Customer</span>
							<span>Sub-Dealer</span>
							<span>International Customer</span>
							<span>Corporate Customer</span>
							<span>International Customer</span>
						</div>
					</InfoBox>
					<InfoBox>
						<div className="head">Payment Account</div>
						<div className="bdy">
							<span>Ikeja Access Bank</span>
							<span>Ikeja Access Bank</span>
							<span>Ikeja Access Bank</span>
							<span>Ikeja Access Bank</span>
							<span>Ikeja Access Bank</span>
						</div>
					</InfoBox>
				</div>
			</div>
			<div>
				<p>Test Sync Commnuication</p>
				<div className="row">
					<div className="col-6">
						<SyncBox className="green">
							<BsCloudUpload size={25} />
							<div>
								<p>3000</p>
								<p>Items Uploaded</p>
							</div>
							<div className="prog">
								<div className="line" />
							</div>
							<button onClick={syncData}>
								<IoMdRefresh size={20} color="#FFF" />
							</button>
						</SyncBox>
					</div>
					<div className="col-6">
						<SyncBox className="blue">
							<BsCloudUpload size={25} />
							<div>
								<p>3000</p>
								<p>Items Downloaded</p>
							</div>
							<div className="prog">
								<div className="line" />
							</div>
							<button>
								<IoMdRefresh size={20} color="#FFF" />
							</button>
						</SyncBox>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Settings;
