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
          alert("You have successfully completed the transaction.")
          console.log(order);
        },
        onError: (err) => {
          console.log(err);
        },
        style: {
          height: 40,
          layout: 'vertical',
          color: 'gold',
          shape: 'pill'
        }
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