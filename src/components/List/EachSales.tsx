import { FaCircleCheck } from "react-icons/fa6";
import { HiDotsVertical } from "react-icons/hi";
import { Link } from "react-router-dom";

const EachSales = ({}: { item: any }) => {
	return (
		<tr>
			<td>Aug 12, 2025</td>
			<td>Classic T-Shirt</td>
			<td className="link">
				<Link to={"12"}>FJJJJDG878G</Link>
			</td>
			<td>John Bosko</td>
			<td>₦30,000</td>
			<td>Hybrid App</td>
			<td>
				<FaCircleCheck size={20} color="#14B8A6" />
				<span>Success</span>
			</td>
			<td className="button">
				<button>
					<HiDotsVertical size={20} color="#000" />
				</button>
			</td>
		</tr>
	);
};

export default EachSales;
