import { IoIosSearch } from "react-icons/io";
import { CartTotal, SearchBtn } from "../../styles/pos.styles";
import { TbTextScan2 } from "react-icons/tb";
import { TableDiv } from "../../styles/table.styles";
import EachCartList from "../List/EachCartList";
import { TableArea } from "../../styles/basic.styles";

const ListView = () => {
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
							{Array.from({ length: 10 }).map((_, i) => (
								<EachCartList key={i} item={{}} />
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
							₦300,000
						</strong>
					</div>
					<div>
						<span>Total Discount</span>
						<strong>₦3,000</strong>
					</div>
					<div>
						<span>Add VAT</span>
						<select>
							<option value={""}>0%</option>
						</select>
					</div>
				</div>
				<div className="button">
					<button disabled={true}>Proceed to Payment</button>
				</div>
			</CartTotal>
		</div>
	);
};

export default ListView;
