import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/expense/group/1'); // Replace with actual group ID
        setExpenses(response.data);
      } catch (error) {
        console.error('Failed to fetch expenses', error);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {expenses.map(expense => (
          <li key={expense.id}>{expense.description} - ${expense.amount}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
