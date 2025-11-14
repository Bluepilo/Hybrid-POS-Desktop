import { HintBoard } from "../styles/basic.styles";

const HintPage = () => {
	return (
		<HintBoard>
			<h5>Hint Page</h5>
			<div className="list">
				<div>🔑 Login to your Bluepilo account</div>
				<div>🏬 Head over to the Shop Management page</div>
				<div>
					👉 Pick the shop you’d like to connect to the POS Hybrid App
				</div>
				<div>📋 Copy the Hybrid Connect Code</div>
				<div>✨ Paste it into the box on this page</div>
				<div>
					And that’s it — you’re all set! 🎉
					<p>
						If you need help, feel free to reach out to support at
						www.bluepilo.com.
					</p>
				</div>
			</div>
		</HintBoard>
	);
};

export default HintPage;
