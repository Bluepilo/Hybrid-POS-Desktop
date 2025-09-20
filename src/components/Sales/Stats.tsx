import { StatsStyles } from "../../styles/basic.styles";
import Icon from "../../assets/images/money.svg";

const Stats = () => {
	return (
		<StatsStyles>
			<div className="stat-item">
				<div className="img">
					<img src={Icon} />
				</div>
				<div className="text">
					<h6>Hybrid Sales</h6>
					<h6>₦200,0000</h6>
				</div>
			</div>
			<div className="stat-item">
				<div className="img">
					<img src={Icon} />
				</div>
				<div className="text">
					<h6>Online Sales</h6>
					<h6>₦200,0000</h6>
				</div>
			</div>
			<div className="stat-item">
				<div className="img">
					<img src={Icon} />
				</div>
				<div className="text">
					<h6>Total Sales</h6>
					<h6>₦400,0000</h6>
				</div>
			</div>
		</StatsStyles>
	);
};

export default Stats;
