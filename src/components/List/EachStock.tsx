const EachStock = ({ item }: { item: any }) => {
	return (
		<tr>
			<td>{item.name}</td>
			<td>No Measurement defined</td>
			<td>{item.totalStock}</td>
			<td>{item.barcode || "No Barcode Attached"}</td>
		</tr>
	);
};

export default EachStock;
