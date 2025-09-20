import { IoCartOutline, IoMenu } from "react-icons/io5";
import { Backdrop, SideStyles } from "../styles/basic.styles";
import Logo from "../assets/images/bluepilo.svg";
import { NavLink } from "react-router-dom";
import { GrList } from "react-icons/gr";
import { FaRegUser } from "react-icons/fa";
import { BsBoxSeam } from "react-icons/bs";
import { VscSettingsGear } from "react-icons/vsc";
import { useAppSelector } from "../utils/hooks";

const Sidebar = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
	const {} = useAppSelector((state) => state.cart);

	const closeOnClick = () => {
		setTimeout(() => {
			onClose();
		}, 300);
	};

	return (
		<>
			<Backdrop $open={open} onClick={onClose} />
			<SideStyles $open={open}>
				<div className="logo">
					<button onClick={onClose}>
						<IoMenu size={22} color="#000" />
					</button>
					<img src={Logo} />
				</div>
				<div className="nav">
					<NavLink to={"/app/pos"} onClick={closeOnClick}>
						<IoCartOutline />
						<span>Point of Sales</span>
					</NavLink>
					<NavLink to={"/app/sales"} onClick={closeOnClick}>
						<GrList />
						<span>Sales Records</span>
					</NavLink>
					<NavLink to={"/app/customers"} onClick={closeOnClick}>
						<FaRegUser />
						<span>Customers</span>
					</NavLink>
					<NavLink to={"/app/stocks"} onClick={closeOnClick}>
						<BsBoxSeam />
						<span>Stocks</span>
					</NavLink>
					<NavLink to={"/app/settings"} onClick={closeOnClick}>
						<VscSettingsGear />
						<span>Settings</span>
					</NavLink>
				</div>
			</SideStyles>
		</>
	);
};

export default Sidebar;
