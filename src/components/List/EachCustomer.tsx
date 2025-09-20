import { FaCircleCheck } from "react-icons/fa6";
import { HiDotsHorizontal } from "react-icons/hi";
import { Link } from "react-router-dom";

const EachCustomer = ({}: { item: any }) => {
	return (
		<tr>
			<td>Aug 12, 2025</td>
			<td className="link">
				<Link to={"1"}>Sarah Johnson</Link>
			</td>
			<td>08188822939</td>
			<td>₦30,000</td>
			<td>₦30,000</td>
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
