import { FiPlus } from "react-icons/fi";
import { BoxList, FlexBetween } from "../../styles/basic.styles";

const DetailsList = () => {
	return (
		<>
			<div className="head">
				<h6>All Sales Receipts</h6>
				<button>
					<FiPlus />
				</button>
			</div>
			<div className="body-content">
				{Array.from({ length: 10 }).map((_, i) => (
					<BoxList key={i} className={i == 1 ? "active" : ""}>
						<span className="check" />
						<div className="content">
							<FlexBetween>
								<h6>Mary Johnson</h6>
								<h6>₦30,000</h6>
							</FlexBetween>
							<div className="d-flex">
								<span>SR12323444</span>
								<span className="ms-2">15 Sept, 2025</span>
							</div>
							<span className="status">Ongoing</span>
						</div>
					</BoxList>
				))}
			</div>
		</>
	);
};

export default DetailsList;
