import { IoIosSearch } from "react-icons/io";
import { CartTotal, SearchBtn } from "../../styles/pos.styles";
import { TbTextScan2 } from "react-icons/tb";
import { TableDiv } from "../../styles/table.styles";
import EachCartList from "../List/EachCartList";

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
			<div className="flex-grow-1 overflow-auto mt-4">
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
							{Array.from({ length: 15 }).map((_, i) => (
								<EachCartList key={i} item={{}} />
							))}
						</tbody>
					</TableDiv>
				</div>
			</div>
			<CartTotal className="border-top bg-light p-3">
				<div className="total">
					<div>
						<span>Total Amount</span>
						<strong>₦300,000</strong>
					</div>
				</div>
			</CartTotal>
		</div>
	);
};

export default ListView;
