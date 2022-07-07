import React from 'react';
import AddExpenseForm from '../components/AddExpenseForm';
import ExpenseTable from '../components/ExpenseTable';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <h1>TrybeWallet</h1>
        <Header />
        <AddExpenseForm />
        <ExpenseTable />
      </>
    );
  }
}

export default Wallet;
