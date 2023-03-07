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
  const d = new Date();
  const currentMonth = monthTable[d.getMonth()];
  const currentYear = d.getFullYear();

  const totalAmountDue = 600;
  let monthlyPayment = 27;
  const repaymentPeriod = totalAmountDue / monthlyPayment;

  const repaymentRowTemplate = (month, year, cumul, rest) => {
    return (
      <>
        <td>{`${month} / ${year}`}</td>
        <td>{monthlyPayment}€</td>
        <td>{cumul}€</td>
        <td>{rest}€</td>
      </>
    );
  };

  const repaymentRows = [];
  const repaymentRowsInit = () => {
    let index = repaymentPeriod;
    let month = currentMonth;
    let year = currentYear;
    let cumul = monthlyPayment;
    let rest = totalAmountDue - monthlyPayment;
    while (index > 0) {
      repaymentRows.push(repaymentRowTemplate(month, year, cumul, rest));
      const newMonth =
        monthTable.indexOf(month) + 1 >= monthTable.length
          ? monthTable[0]
          : monthTable[monthTable.indexOf(month) + 1];
      month = newMonth;
      year = monthTable.indexOf(month) == 0 ? year + 1 : year;
      if (cumul + monthlyPayment <= totalAmountDue) {
        cumul = cumul + monthlyPayment;
        rest = totalAmountDue - cumul;
      } else {
        cumul = totalAmountDue;
        monthlyPayment = rest;
        rest = 0;
      }
      index--;
    }
  };

  if (monthlyPayment >= totalAmountDue) {
    alert("Mensualité trop élevée");
  } else {
    repaymentRowsInit();
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Mois / Année</th>
            <th>Mensualités</th>
            <th>Cumule</th>
            <th>Reste</th>
          </tr>
        </thead>
        <tbody>
          {repaymentRows.map((row, i) => (
            <tr key={`échéance-${i}`}>{row}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
