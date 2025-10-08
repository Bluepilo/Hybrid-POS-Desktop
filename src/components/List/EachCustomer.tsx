import { FaCircleCheck } from "react-icons/fa6";
import { HiDotsHorizontal } from "react-icons/hi";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/currency";

const EachCustomer = ({ item }: { item: any }) => {
	return (
		<tr>
			<td className="link">
				<Link to={`${item.customerId}`}>{item.name}</Link>
			</td>
			<td>{item.phone}</td>
			<td>{item.email}</td>
			<td>₦{formatCurrency(item.balance)}</td>
			<td>₦{formatCurrency(item.creditLimit)}</td>
			<td className="status">
				<span className="active">Active</span>
			</td>
			<td>
				<FaCircleCheck size={20} color="#14B8A6" />
				<span>Success</span>
			</td>
			<td className="button">
				<button>
					<HiDotsHorizontal size={20} color="#000" />
				</button>
			</td>
		</tr>
	);
};

export default EachCustomer;
