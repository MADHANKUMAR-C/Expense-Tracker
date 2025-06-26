import React, { useState } from 'react'
import './Expenselist.css'

export default function Expenselist(props) {
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editAmount, setEditAmount] = useState('');

  function startEdit(expense) {
    setEditId(expense._id);
    setEditName(expense.title);
    setEditAmount(expense.amount);
  }

  function handleSave(id) {
    props.editExpense(id, editName, editAmount);
    setEditId(null);
    setEditName('');
    setEditAmount('');
  }

  function handleCancel() {
    setEditId(null);
    setEditName('');
    setEditAmount('');
  }

  return (
    <>
      <ul className='unorderlist'>
        {props.expenses.map((expense) => (
          <li className='lstitems' key={expense._id}>
            {editId === expense._id ? (
              <>
                <input
                  type="text"
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  style={{ width: '100px' }}
                />
                <input
                  type="number"
                  value={editAmount}
                  onChange={e => setEditAmount(e.target.value)}
                  style={{ width: '70px' }}
                />
                <button onClick={() => handleSave(expense._id)}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
              </>
            ) : (
              <>
                {expense.title}: {expense.amount} &nbsp;
                <button onClick={() => props.deleteExpense(expense._id)}>Delete</button>
                <button onClick={() => startEdit(expense)}>Edit</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  )
}