import { useEffect, useState } from "react";
import SelectField from "../../../components/SelectField";
import Button from "../../../components/Button";
import { CoverScroll, UploadContainer } from "../../../styles/basic.styles";
import { BsCloudUpload } from "react-icons/bs";
import InputField from "../../../components/InputField";
import { SelectedCustomerStyle, ViewTotal } from "../../../styles/pos.styles";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { removeFromCart, updateCartField } from "../../../redux/cart/cartSlice";
import { confirm } from "@tauri-apps/plugin-dialog";
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from "../../../utils/currency";
import { displayError } from "../../../utils/display";
import { insertSaleWithProducts } from "../../../utils/dbUpdate";

const CompleteSale = ({ cartId }: { cartId: any }) => {
	const dispatch = useAppDispatch();

	const navigate = useNavigate();

	const { customers } = useAppSelector((state) => state.app);
	const { cartItems } = useAppSelector((state) => state.cart);
	const { shopInfo } = useAppSelector((state) => state.auth);

	const cartInfo = cartItems.find((cart) => cart.cartId === cartId);

	let totalAmount =
		cartInfo?.products?.reduce((a, b) => a + b.price * b.quantity, 0) || 0;

	const [load, setLoad] = useState(false);
	const [customerInfo, setCustomerInfo] = useState("");
	const [date, setDate] = useState("");
	const [reference, setReference] = useState("");
	const [notes, setNotes] = useState("");
	const [list] = useState(
		customers
			?.filter((f: any) =>
				cartInfo?.isSubdealer
					? f.isSubdealer === "true"
					: f.isSubdealer === "false"
			)
			?.map((val: any) => {
				return { ...val, label: val.name, value: val.customerId };
			})
	);
	const [minAmount, setMinAmount] = useState(0);
	const [received, setReceived] = useState("");

	useEffect(() => {
		if (customerInfo) {
			getMinAmountDue();
		}
	}, [customerInfo]);

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

	const loadCustomerInfo = () => {
		let find = list?.find((li: any) => li.value == customerInfo);
		if (find) {
			return {
				name: find.name,
				phone: find.phone || find.email,
				balance: find.balance,
				creditLimit: find.creditLimit,
			};
		} else {
			return { name: "", phone: "", balance: 0, creditLimit: null };
		}
	};

	const getMinAmountDue = () => {
		let discountApplied = 0;
		const minimumAmountDue =
			totalAmount -
			discountApplied -
			(Number(loadCustomerInfo().balance) +
				Number(loadCustomerInfo()?.creditLimit || 0));

		setMinAmount(minimumAmountDue);
	};

	const validateAmount = (val: string) => {
		const rawValue = val.replace(/,/g, "");
		// only allow digits
		if (/^\d*\.?\d*$/.test(rawValue)) {
			setReceived(rawValue ? numberWithCommas(rawValue) : "");
		}
	};

	const submitHandler = async () => {
		if (customerInfo) {
			try {
				setLoad(true);
				let payload = {
					actorId: customerInfo,
					isSubdealer: cartInfo?.isSubdealer ? true : false,
					products: cartInfo?.products,
					isDeposit: false,
					comment: "Sales Made on Hybrid App",
					amountPaid: Number(received.replace(/,/g, "")),
					discount: 0,
					amountExpected: totalAmount - 0,
					status: cartInfo?.isAdvanced ? "preorder" : "complete",
					shopId: shopInfo?.id,
					paymentMethodId: 3,
					uniqueRef: cartId,
					generatedRef: cartId,
				};
				await insertSaleWithProducts(payload);
				dispatch(removeFromCart(cartId));
				navigate("/app/sales");
				setLoad(false);
			} catch (err) {
				setLoad(false);
				displayError(err, true);
			}
		} else {
			displayError("Please Select Customer", true);
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
								options={list}
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
								onClick={submitHandler}
								bg="#0141FF"
								disabled={load}
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
					{customerInfo && (
						<SelectedCustomerStyle className="mt-3">
							<div className="box1">
								<div className="first">
									<p>{loadCustomerInfo()?.name}</p>
									<p>{loadCustomerInfo()?.phone}</p>
								</div>
								<div className="second">
									<span>Wallet Balance</span>
									<h5>
										₦
										{numberWithCommas(
											loadCustomerInfo()?.balance
										)}
									</h5>
								</div>
							</div>
							<div className="box2 mt-2">
								<div>
									<h6>Minimum Amount Due:</h6>
									<p>
										total payment due - (wallet balance +
										credit limit)
									</p>
								</div>
								<h5>
									₦
									{numberWithCommas(
										minAmount > 0 ? minAmount : 0
									)}
								</h5>
							</div>
						</SelectedCustomerStyle>
					)}
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
						<span>₦</span>
						<input
							value={received}
							onChange={(e) => validateAmount(e.target.value)}
						/>
					</ViewTotal>
					<ViewTotal className="mt-3" style={{ background: "#000" }}>
						<h6 style={{ color: "#FFF" }}>Sales Total:</h6>
						<h5 style={{ color: "rgba(255, 185, 0, 1)" }}>
							₦ {numberWithCommas(totalAmount)}
						</h5>
					</ViewTotal>
				</div>
			</div>
		</CoverScroll>
	);
};

export default CompleteSale;
