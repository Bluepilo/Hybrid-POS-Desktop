import { TableDiv } from "../../styles/table.styles";
import { formatCurrency } from "../../utils/currency";
import { useAppSelector } from "../../utils/hooks";

const SyncedSaleItems = ({ data }: { data: any }) => {
	const { shopInfo } = useAppSelector((state) => state.auth);

	return (
		<TableDiv className="table mb-0">
			<thead>
				<tr>
					<th>Items Picked</th>
					<th>Unit Sold</th>
					<th>Selling Price</th>
					<th>Gross Sales</th>
					<th>Discount</th>
					<th>Net Sales</th>
					<th>VAT Amount</th>
					<th>Account Receivables</th>
					<th>Sales Revenue</th>
				</tr>
			</thead>
			<tbody>
				{Array.isArray(data) &&
					data.map((product: any) => (
						<tr key={product.id}>
							<td>
								{product.productName} (Vat-
								{product.vatType})
							</td>
							<td>{formatCurrency(product.quantity)}</td>
							<td>{formatCurrency(product.sellingPrice)}</td>
							<td>
								{shopInfo?.currency}{" "}
								{formatCurrency(product.grossAmount)}
							</td>
							<td>
								{shopInfo?.currency}{" "}
								{formatCurrency(product.totalDiscount)}
							</td>
							<td>
								{shopInfo?.currency}{" "}
								{formatCurrency(product.netAmount)}
							</td>
							<td>
								{shopInfo?.currency}{" "}
								{formatCurrency(product.vatAmount)}
							</td>
							<td>
								{shopInfo?.currency}{" "}
								{formatCurrency(product.recievableAmount)}
							</td>
							<td>
								{shopInfo?.currency}{" "}
								{formatCurrency(product.salesRevenue)}
							</td>
						</tr>
					))}
			</tbody>
			<tfoot>
				<tr>
					<td>Total</td>
					<td>
						{formatCurrency(
							data?.reduce((a: any, b: any) => a + b.quantity, 0),
						)}
					</td>
					<td>
						{shopInfo?.currency}
						{formatCurrency(
							data?.reduce(
								(a: any, b: any) => a + b.sellingPrice,
								0,
							),
						)}
					</td>
					<td>
						{shopInfo?.currency}
						{formatCurrency(
							data?.reduce(
								(a: any, b: any) => a + b.grossAmount,
								0,
							),
						)}
					</td>
					<td>
						{shopInfo?.currency}
						{formatCurrency(
							data?.reduce(
								(a: any, b: any) => a + b.totalDiscount,
								0,
							),
						)}
					</td>
					<td>
						{shopInfo?.currency}
						{formatCurrency(
							data?.reduce(
								(a: any, b: any) => a + b.netAmount,
								0,
							),
						)}
					</td>
					<td>
						{shopInfo?.currency}
						{formatCurrency(
							data?.reduce(
								(a: any, b: any) => a + b.vatAmount,
								0,
							),
						)}
					</td>
					<td>
						{shopInfo?.currency}
						{formatCurrency(
							data?.reduce(
								(a: any, b: any) => a + b.recievableAmount,
								0,
							),
						)}
					</td>
					<td>
						{shopInfo?.currency}
						{formatCurrency(
							data?.reduce(
								(a: any, b: any) => a + b.salesRevenue,
								0,
							),
						)}
					</td>
				</tr>
			</tfoot>
		</TableDiv>
	);
};

export default SyncedSaleItems;
