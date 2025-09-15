import { FaCircleCheck } from "react-icons/fa6";
import { HiDotsVertical } from "react-icons/hi";

const EachSales = ({}: { item: any }) => {
	return (
		<tr>
			<td>Aug 12, 2025</td>
			<td>Classic T-Shirt</td>
			<td>FJJJJDG878G</td>
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
