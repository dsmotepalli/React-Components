import "./App.css";
import CheckOutStepper from "./CheckOutStepper";

const CHECKOUT_STEPS = [
  {
    name: "Customer Info",
    component: () => <div>Provide your contact details</div>,
  },
  {
    name: "Shipping Info",
    component: () => <div>Enter your shipping address</div>,
  },
  {
    name: "Payment",
    component: () => <div>Complete Payment for your order</div>,
  },
  {
    name: "Placed",
    component: () => <div>Your order has been placed</div>,
  },
];

function App() {
  return (
    <div>
      <CheckOutStepper stepsConfig={CHECKOUT_STEPS} />
    </div>
  );
}

export default App;
