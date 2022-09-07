import Budget from '../component/Budget';
import Expense from '../component/Expense';
// import ExpenseList from '../component/ExpenseList';
import Layout from '../component/Layout';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import {
  expenseHandler,
  editHandlers,
  deleteHandlers,
} from '../store/redux/expense';
import { useEffect, useState } from 'react';
export default function Home() {
  const [editId, setEditId] = useState(null);

  const budget = useSelector((state) => state.budget.budget);
  const expense = useSelector((state) => state.expense.expense);
  const amount = useSelector((state) => state.expense.amount);
  const editMode = useSelector((state) => state.expense.editMode);
  const editObject = useSelector((state) => state.expense.editObject);
  console.log(expense, amount);
  const { register, handleSubmit, reset, setValue } = useForm();
  useEffect(() => {
    if (editMode) {
      setValue('expense', editObject.expense);
      setValue('amount', editObject.amount);
      setEditId(editObject.id);
    }
  }, [amount, editMode, expense, setValue]);
  const dispatch = useDispatch();

  const expenseItems = useSelector((state) => state.expense.expenseItem);

  const totalExpense = expenseItems.reduce((accumulator, object) => {
    return accumulator + object.amount;
  }, 0);
  const onSubmit = (data) => {
    let expenditure = {
      id: editMode ? editId : '',
      item: data.expense,
      amount: Number(data.amount),
    };
    dispatch(expenseHandler(expenditure));
    reset();
  };
  const editHandler = (e) => {
    console.log(e);
    dispatch(editHandlers(e));
  };
  const deleteHandler = (e) => {
    console.log(e);
    dispatch(deleteHandlers(e));
  };
  return (
    <>
      <Layout title="Home">
        <Budget budget={budget} totalExpense={totalExpense} />
        {/* Expense */}
        <div className="mx-3 flex justify-around ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid items-center content-center w-2/5 px-32">
              <h1 className="text-lg mx-auto">Budget Amount</h1>
              <input
                className="border border-gray-200 my-1 mx-3 rounded-md"
                placeholder="Expense"
                type="text"
                {...register('expense', { required: true })}
              />
              <input
                className="border border-gray-200 my-1 mx-3 rounded-md"
                placeholder="Amount"
                type="number"
                {...register('amount', { required: true })}
              />
              <button
                type="submit"
                className="my-1 rounded-md text-white mx-3 border bg-cyan-600 border-cyan-700 hover:bg-cyan-800"
              >
                Add Expense
              </button>
            </div>
          </form>

          {/* Expense List */}
          <div className="w-3/5 my-5 ">
            <h1 className="text-lg my-2 text-left mx-3">Expense Summary :</h1>
            <table className="w-full border table-auto mx-3 text-black">
              <thead className="border-b px-2">
                <tr className="text-center font-bold">
                  <th>Sr.No</th>
                  <th>Expense </th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="border-b px-2">
                {expenseItems.length > 0 &&
                  expenseItems.map((expense) => {
                    return (
                      <tr
                        key={expense.id}
                        className={
                          editMode &&
                          editId === expense.id &&
                          'my-2 bg-slate-300'
                        }
                      >
                        <td className="text-center">{expense.id}</td>
                        <td className="text-center">{expense.item}</td>
                        <td className="text-center">$ {expense.amount}</td>
                        <td className="flex justify-evenly text-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 hover:text-green-500"
                            onClick={() => editHandler(expense)}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 hover:text-red-500"
                            onClick={() => deleteHandler(expense)}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    </>
  );
}
