import { IoIosSearch } from "react-icons/io";
import { CartTotal, SearchBtn } from "../../styles/pos.styles";
import { TbTextScan2 } from "react-icons/tb";
import { TableDiv } from "../../styles/table.styles";
import EachCartList from "../List/EachCartList";
import { TableArea } from "../../styles/basic.styles";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../utils/hooks";
import { numberWithCommas } from "../../utils/currency";

const ListView = () => {
	const params = useParams();

	const { cartItems } = useAppSelector((state) => state.cart);

	const productsInCart =
		cartItems.find((cart) => cart.cartId === params?.tabId)?.products || [];

	return (
		<div className="d-flex flex-column h-100">
			<div className="row">
				<div className="col-8">
					<SearchBtn>
						<div className="input">
							<input type="text" placeholder="Search Name" />
							<IoIosSearch size={18} color="#333" />
						</div>

						<button>
							<TbTextScan2 size={20} />
							<span>Scan Barcode</span>
						</button>
					</SearchBtn>
				</div>
			</div>
			<TableArea>
				<div className="table-responsive h-100">
					<TableDiv className="table mb-0">
						<thead>
							<tr>
								<th>Products</th>
								<th>Quantity</th>
								<th>Unit Price</th>
								<th>Discount</th>
								<th>Total</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{productsInCart.map((product) => (
								<EachCartList
									key={product.id}
									item={product}
									cartId={params?.tabId}
								/>
							))}
						</tbody>
					</TableDiv>
				</div>
			</TableArea>
			<CartTotal>
				<div className="total">
					<div>
						<span>Total Amount</span>
						<strong style={{ color: "#FFB500", fontSize: "2rem" }}>
							₦
							{numberWithCommas(
								productsInCart.reduce(
									(a: any, b: any) => a + b.price,
									0
								)
							)}
						</strong>
					</div>
					<div>
						<span>Total Discount</span>
						<strong>₦0</strong>
					</div>
					<div>
						<span>Add VAT</span>
						<select>
							<option value={""}>0%</option>
						</select>
					</div>
				</div>
				<div className="button">
					<button disabled={productsInCart.length > 0 ? false : true}>
						Proceed to Payment
					</button>
				</div>
			</CartTotal>
		</div>
	);
};

export default ListView;
