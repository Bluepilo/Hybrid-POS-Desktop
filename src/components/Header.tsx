import { HeaderStyles } from "../styles/header.styles";
import { IoMenu } from "react-icons/io5";
import Logo from "../assets/images/bluepilo.svg";
import { FiPlus } from "react-icons/fi";
import { LiaTimesSolid } from "react-icons/lia";
import { FaQuestionCircle } from "react-icons/fa";
import { useState } from "react";
import Sidebar from "./Sidebar";

const Header = () => {
	const [openMenu, setOpenMenu] = useState(false);

	return (
		<>
			<HeaderStyles>
				<div className="left-nav">
					<button className="me-2" onClick={() => setOpenMenu(true)}>
						<IoMenu size={22} color="#000" />
					</button>
					<img src={Logo} />
					<div className="tab">
						<div className="select active">
							<span>Tab 1</span>
							<LiaTimesSolid />
						</div>
						<button className="plus">
							<FiPlus color="rgba(0, 13, 51, 1)" size={20} />
						</button>
					</div>
				</div>
				<div className="right-nav">
					<div className="user">
						<div className="name">
							<span className="status" />
							<b>Staff:</b>
							<span>Alex Johnson</span>
						</div>
						<div className="time">Sept 10, 2025, 05:00 PM</div>
					</div>
					<button>
						<FaQuestionCircle />
						<span>Hint</span>
					</button>
				</div>
			</HeaderStyles>
			<Sidebar open={openMenu} onClose={() => setOpenMenu(false)} />
		</>
	);
};

export default Header;
