import { TableDiv } from "../../styles/table.styles";
import { formatCurrency } from "../../utils/currency";
import { useAppSelector } from "../../utils/hooks";

const UnsyncedSaleItems = ({ data }: { data: any }) => {
	const { shopInfo } = useAppSelector((state) => state.auth);

	return (
		<TableDiv className="table mb-0">
			<thead>
				<tr>
					<th>Items Picked</th>
					<th>Unit</th>
					<th>Amount</th>
				</tr>
			</thead>
			<tbody>
				{data?.map((p: any) => (
					<tr>
						<td key={p.id}>{p.productName}</td>
						<td>{p.quantity}</td>
						<td>
							{shopInfo?.currency}
							{formatCurrency(p.price)}
						</td>
					</tr>
				))}
			</tbody>
			{data?.length > 0 && (
				<tfoot>
					<tr>
						<td>Total</td>
						<td>
							{data?.reduce(
								(a: any, b: any) => a + b.quantity,
								0,
							)}
						</td>
						<td>
							{shopInfo?.currency}
							{formatCurrency(
								data?.reduce(
									(a: any, b: any) => a + b.price,
									0,
								),
							)}
						</td>
					</tr>
				</tfoot>
			)}
		</TableDiv>
	);
};

export default UnsyncedSaleItems;
