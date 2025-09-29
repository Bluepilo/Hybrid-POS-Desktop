import { useState } from "react";
import SelectField from "../../../components/SelectField";
import Button from "../../../components/Button";
import { CoverScroll, UploadContainer } from "../../../styles/basic.styles";
import { BsCloudUpload } from "react-icons/bs";
import InputField from "../../../components/InputField";
import { SelectedCustomerStyle, ViewTotal } from "../../../styles/pos.styles";
import { useAppDispatch } from "../../../utils/hooks";
import { removeFromCart, updateCartField } from "../../../redux/cart/cartSlice";
import { confirm } from "@tauri-apps/plugin-dialog";

const CompleteSale = ({ cartId }: { cartId: any }) => {
	const dispatch = useAppDispatch();

	const [customerInfo, setCustomerInfo] = useState("");
	const [date, setDate] = useState("");
	const [reference, setReference] = useState("");
	const [notes, setNotes] = useState("");

	const onBack = () => {
		dispatch(
			updateCartField({
				cartId,
				value: false,
				field: "proceed",
			})
		);
	};

	const onCancel = async () => {
		const confirmed = await confirm(
			`This will clear all the products in the cart. Do you wish to proceed?`,
			{
				title: "Cancel Transaction",
				kind: "warning", // Optional: 'info', 'warning', 'error'
			}
		);
		if (confirmed) {
			dispatch(removeFromCart(cartId));
		}
	};

	return (
		<CoverScroll>
			<div className="row">
				<div className="col-6">
					<div className="row align-items-end">
						<div className="col-sm-8 mt-3">
							<SelectField
								value={customerInfo}
								setValue={setCustomerInfo}
								options={[]}
								label="Customer Details"
								placeholder="Search Name or Phone Number"
								noMargin={true}
							/>
						</div>
						<div className="col-sm-4 mt-3">
							<Button
								name="New Customer"
								onClick={() => console.log("")}
								bg="#0141FF"
							/>
						</div>
					</div>
					<div
						style={{
							border: "1px solid rgba(234, 234, 234, 1)",
							borderRadius: "20px",
							padding: "10px 20px",
							marginTop: "20px",
							marginBottom: "15px",
						}}
					>
						<InputField
							value={date}
							setValue={setDate}
							inputType="date"
							label="Date"
						/>
						<InputField
							value={reference}
							setValue={setReference}
							inputType="text"
							label="Reference ID"
						/>
						<InputField
							value={notes}
							setValue={setNotes}
							inputType="text"
							label="Notes"
							multi={true}
						/>
						<UploadContainer>
							<BsCloudUpload size={18} />
							Upload Sales Evidence
							<input type="file" hidden />
						</UploadContainer>
					</div>
					<div className="row">
						<div className="col-12 mb-3">
							<Button
								name="Complete Transaction"
								onClick={() => console.log("")}
								bg="#0141FF"
							/>
						</div>
						<div className="col-6 mb-3">
							<Button
								name="Go Back"
								onClick={onBack}
								color="#0141FF"
								border="#0141FF"
								bg="#FFF"
							/>
						</div>
						<div className="col-6 mb-3">
							<Button
								name="Cancel Transaction"
								onClick={onCancel}
								bg="#FFF"
								color="red"
								border="red"
							/>
						</div>
					</div>
				</div>
				<div className="col-6">
					<SelectedCustomerStyle className="mt-3">
						<div className="box1">
							<div className="first">
								<p>Sugar Boy PLC</p>
								<p>+235901342433</p>
							</div>
							<div className="second">
								<span>Wallet Balance</span>
								<h5>₦500,000</h5>
							</div>
						</div>
						<div className="box2 mt-2">
							<div>
								<h6>Minimum Amount Due:</h6>
								<p>
									total payment due - (wallet balance + credit
									limit)
								</p>
							</div>
							<h5>₦50,000</h5>
						</div>
					</SelectedCustomerStyle>
					<div
						style={{
							border: "1px solid rgba(234, 234, 234, 1)",
							borderRadius: "20px",
							padding: "10px 20px",
							marginTop: "20px",
							marginBottom: "15px",
							minHeight: "200px",
						}}
					>
						<SelectField
							value={customerInfo}
							setValue={setCustomerInfo}
							options={[]}
							label="Preferred Payment Method"
							placeholder="Select Payment Method"
							noMargin={true}
						/>
					</div>
					<ViewTotal>
						<h6>Amount Received:</h6>
						<h5>₦ 250,000</h5>
					</ViewTotal>
					<ViewTotal className="mt-3" style={{ background: "#000" }}>
						<h6 style={{ color: "#FFF" }}>Sales Total:</h6>
						<h5 style={{ color: "rgba(255, 185, 0, 1)" }}>
							₦ 590,000
						</h5>
					</ViewTotal>
				</div>
			</div>
		</CoverScroll>
	);
};

export default CompleteSale;
