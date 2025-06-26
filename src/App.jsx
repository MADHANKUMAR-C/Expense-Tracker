import { useEffect, useState } from 'react'
import './App.css'
import Expenselist from './Expenselist';
import CalculateSummary from './CalculateSummary';
import axios from 'axios';

function App() {
  const [amount, setAmount] = useState();
  const [name, setName] = useState('');
  const [expenses, setExpenses]= useState([]);

  useEffect(()=>{
    axios.get("https://expense-tracker-backend-jiej.onrender.com/api/expenses/").then((res)=> setExpenses(res.data)).catch((err)=>console.error("Fetch error: ", err));
  },[])

  function editExpense(id, newName, newAmount){
  axios.put(`https://expense-tracker-backend-jiej.onrender.com/api/expenses/${id}`, { title: newName, amount: Math.abs(Number(newAmount)) })
    .then(() => axios.get("https://expense-tracker-backend-jiej.onrender.com/api/expenses/")
      .then((res) => setExpenses(res.data))
      .catch((err) => console.error("Fetch error: ", err)))
    .catch((err) => console.log("Edit Error: ", err));
}

  function deleteExpense(id){
    axios.delete(`https://expense-tracker-backend-jiej.onrender.com/api/expenses/${id}`)
      .then(() => setExpenses(expenses.filter((expense) => expense._id !== id)))
      .catch((err) => console.log("Delete Err:", err));
  }

  function handleSubmit(e) {
  e.preventDefault();

  const finalAmount = Math.abs(Number(amount));
  const temp = {
    title: name,
    amount: finalAmount
  };
  axios.post("https://expense-tracker-backend-jiej.onrender.com/api/expenses/", temp)
    .then(() => {
      setAmount('');
      setName('');
      axios.get("https://expense-tracker-backend-jiej.onrender.com/api/expenses/")
        .then((res) => setExpenses(res.data))
        .catch((err) => console.error("Fetch error: ", err));
    })
    .catch((err) => console.log("Add Error", err));
}

  function handleInputChange(e) {
    setAmount(e.target.value);
  }

  function handleName(e) {
    setName(e.target.value);
  }

  return (
    <>
      <div className="center-wrapper">
      <div className='leftDiv'>
        <h1>Expense Tracker</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Name'
            value={name}
            onChange={handleName}
          />
          <input
            type='number'
            placeholder='Amount'
            value={amount}
            onChange={handleInputChange}
          />
          <button type='submit'>Add Expense</button>
        </form>
        </div>
        <div className='rightDiv'>
        <h1>Expenses</h1>
      <Expenselist expenses={expenses} deleteExpense={deleteExpense} editExpense={editExpense} />
      </div>
       </div>
       <CalculateSummary expenses={expenses} />
    </>
  )
}
export default App
