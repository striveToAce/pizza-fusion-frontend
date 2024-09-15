import { OrderDetails } from "@/components/myCart/OrderDetails";
const OrderDetailPage = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  return typeof id === "string" ? <OrderDetails id={id} /> : <div></div>;
};
export default OrderDetailPage;
