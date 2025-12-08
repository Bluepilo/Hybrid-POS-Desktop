import { StatsStyles } from "../../styles/basic.styles";
import Icon from "../../assets/images/money.svg";
import { formatCurrency } from "../../utils/currency";
import { useAppSelector } from "../../utils/hooks";

const Stats = ({ list }: { list: any }) => {
	const { shopInfo } = useAppSelector((state) => state.auth);

	const totalAmount = list?.data?.reduce(
		(a: any, b: any) => a + b.amountExpected,
		0
	);

	return (
		<StatsStyles>
			<div className="stat-item">
				<div className="img">
					<img src={Icon} />
				</div>
				<div className="text">
					<h6>Hybrid Sales</h6>
					<h6>
						{shopInfo?.currency}
						{formatCurrency(totalAmount)}
					</h6>
				</div>
			</div>
			<div className="stat-item">
				<div className="img">
					<img src={Icon} />
				</div>
				<div className="text">
					<h6>Online Sales</h6>
					<h6>{shopInfo?.currency}--</h6>
				</div>
			</div>
			<div className="stat-item">
				<div className="img">
					<img src={Icon} />
				</div>
				<div className="text">
					<h6>Total Sales</h6>
					<h6>{shopInfo?.currency}--</h6>
				</div>
			</div>
		</StatsStyles>
	);
};

export default Stats;
