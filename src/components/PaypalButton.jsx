import React, { useRef, useEffect } from 'react'

function PaypalButton(){
  const paypal = useRef();

  useEffect(() => {
    window.paypal.Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Testing description",
                amount: {
                  currency_code: "USD",
                  value: 30.0,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log(order);
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, []);

  return(
    <div>
      <div ref={paypal}></div>
    </div>
  );
}
export default PaypalButton;