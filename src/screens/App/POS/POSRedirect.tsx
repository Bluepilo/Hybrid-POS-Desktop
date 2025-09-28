import { Navigate } from "react-router-dom";
import { generateId } from "../../../utils/data";
import { useAppSelector } from "../../../utils/hooks";

const POSRedirect = () => {
	const { cartItems } = useAppSelector((state) => state.cart);

	const id = generateId();
	const posId = cartItems?.length > 0 ? cartItems[0].cartId : id;

	return <Navigate to={`/app/pos/${posId}`} />;
};

export default POSRedirect;
