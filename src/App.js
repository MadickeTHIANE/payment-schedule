import React, { useState } from "react";
import "./index.css";

function App() {
  const monthMap = [
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
  const currentMonth = monthMap[d.getMonth()];
  const currentYear = d.getFullYear();

  const [totalLoan, setTotalLoan] = useState(6000);
  const [monthlyPmt, setMonthlyPmt] = useState(100);

  const repaymentRowTemplate = (month, year, cumul, rest, monthlyPayment) => {
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
    let totalAmountDue = totalLoan;
    let monthlyPayment = monthlyPmt;
    let repaymentPeriod = Math.ceil(totalAmountDue / monthlyPayment);
    console.log(repaymentPeriod);
    let index = repaymentPeriod;
    let month = currentMonth;
    let year = currentYear;
    let cumul = monthlyPayment;
    let restToPay = totalAmountDue - monthlyPayment;
    while (index > 0) {
      repaymentRows.push(
        repaymentRowTemplate(month, year, cumul, restToPay, monthlyPayment)
      );
      const newMonth =
        monthMap.indexOf(month) + 1 >= monthMap.length
          ? monthMap[0]
          : monthMap[monthMap.indexOf(month) + 1];
      month = newMonth;
      year = monthMap.indexOf(month) == 0 ? year + 1 : year;
      if (cumul + monthlyPayment <= totalAmountDue) {
        cumul = cumul + monthlyPayment;
        restToPay = totalAmountDue - cumul;
      } else {
        cumul = totalAmountDue;
        monthlyPayment = restToPay;
        restToPay = 0;
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
      <div>
        <label>
          Montant total à rembourser
          <input
            value={totalLoan}
            onChange={(e) => setTotalLoan(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Mensualités
          <input
            value={monthlyPmt}
            onChange={(e) => setMonthlyPmt(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          <input
            value="Générer l'échéancier"
            type="submit"
            onClick={handleClick}
          />
        </label>
      </div>
      <hr />
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
