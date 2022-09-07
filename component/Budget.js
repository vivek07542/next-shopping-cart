import React from 'react';
import { useForm } from 'react-hook-form';
import { budgetHandler } from '../store/redux/budget';
import { useDispatch } from 'react-redux';

const Budget = ({ budget, totalExpense }) => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const onBudgetSubmit = (data) => {
    dispatch(budgetHandler(Number(data.budget)));
    reset();
  };
  return (
    <div className=" m-3 flex border border-gray-200 rounded-md h-60 px-4 justify-around">
      <form onSubmit={handleSubmit(onBudgetSubmit)}>
        <div className="grid items-center content-center">
          <h1 className="text-lg text-bold mx-auto">Budget Amount</h1>
          <input
            className="border border-gray-200 my-1 mx-3 rounded-md"
            placeholder="Budget"
            type="number"
            {...register('budget', { required: true })}
          />
          <button
            type="submit"
            className="my-1 rounded-md px-3 text-white mx-3 border bg-cyan-600 border-cyan-700 hover:bg-cyan-800"
          >
            Add Budget
          </button>
        </div>
      </form>

      <div className="grid items-center content-center ">
        <h1 className="text-xl mx-auto">Budget Allocated</h1>
        <p className="text-lg font-bold"> $ {budget}</p>
      </div>
      <div className="grid items-center content-center ">
        <h1 className="text-xl mx-auto">Total Expenses</h1>
        <p className="text-lg font-bold text-red-600"> $ {totalExpense}</p>
      </div>
      <div className="grid items-center content-center">
        <h1 className="text-xl  mx-auto">Bal. Amount</h1>
        <p className="text-lg font-bold text-green-600">
          $ {budget - totalExpense}
        </p>
      </div>
    </div>
  );
};

export default Budget;
