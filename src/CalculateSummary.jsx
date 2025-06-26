import React from 'react'

export default function CalculateSummary(props) {
  const income=50000;
  const totalExpense= props.expenses.reduce((acc, expense)=>acc+expense.amount, 0);
  return (
    <>
    <h1>Summary</h1>
    <p><b>Income:</b> {income}</p>
    <p><b>Total Expense:</b> {totalExpense}</p>
    <b><b>Remaining Balance: </b>{income-totalExpense}</b>
    </>
    )
}
