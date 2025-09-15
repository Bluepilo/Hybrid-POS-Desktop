import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { PaginateStyles } from "../../styles/table.styles";
import { DOTS, usePagination } from "./usePagination";
import HintIcon from "../../assets/images/hint.svg";

interface Props {
	changeLimit: (arg: number) => void;
	limit: number;
	count: number;
	pageNumber: number;
	onSelect: (arg: number) => void;
}

const Paginate = ({
	changeLimit,
	count,
	limit,
	pageNumber,
	onSelect,
}: Props) => {
	const pages = Math.ceil(count / limit);

	const paginationRange = usePagination({
		pageNumber,
		count,
		siblingCount: 1,
		limit,
	});

	return (
		<PaginateStyles>
			<div className="hint">
				<button>
					<img src={HintIcon} />
					<span>Show Page Hint</span>
				</button>
			</div>
			<div className="pages">
				<div className="select">
					<select
						value={limit}
						onChange={(e) => {
							changeLimit(Number(e.target.value));
						}}
					>
						<option value={"10"}>10</option>
						<option value={"20"}>20</option>
						<option value={"50"}>50</option>
						<option value={"100"}>100</option>
					</select>
					<span>entries per page</span>
				</div>
				<div className="clicks">
					<button
						disabled={pageNumber > 1 ? false : true}
						onClick={() => onSelect(pageNumber - 1)}
					>
						<RxCaretLeft size={25} />
						<span>Prev</span>
					</button>
					{paginationRange &&
						paginationRange.map((p, i) => (
							<div className="keys" key={i + 1}>
								{p === DOTS ? (
									<span>---</span>
								) : (
									<button
										className={
											p === pageNumber ? "active" : ""
										}
										onClick={() => onSelect(p)}
									>
										{p}
									</button>
								)}
							</div>
						))}
					<button
						disabled={pageNumber != pages ? false : true}
						onClick={() => onSelect(pageNumber + 1)}
					>
						<span>Next</span>
						<RxCaretRight size={25} />
					</button>
				</div>
			</div>
		</PaginateStyles>
	);
};

export default Paginate;
