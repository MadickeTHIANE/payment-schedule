import React from "react";
import "./index.css";

function App() {
  const monthTable = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  const totalAmountDue = 6000;
  const monthlyPayment = 100;
  const repaymentPeriod = totalAmountDue / monthlyPayment;
  const repaymentRows = () => {
    return (
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    );
  };

  React.useEffect(() => {
    console.log("***repaymentPeriod : " + repaymentPeriod);
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Année</th>
            <th>Mensualités</th>
            <th>Cumule</th>
            <th>Reste</th>
            {/* {monthTable.map((month, id) => (
            <th  key={id}>
            {month}
            </th>
          ))} */}
          </tr>
        </thead>
        <tbody>{repaymentRows()}</tbody>
      </table>
    </div>
  );
}

export default App;
