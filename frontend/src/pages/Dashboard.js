import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDailySalesReport, fetchSalesByProduct } from '../redux/slices/transactionSlice';
import { Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../styles/Dashboard.css';

function Dashboard() {
  const dispatch = useDispatch();
  const { dailyReport, salesByProduct } = useSelector(state => state.transaction);
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchDailySalesReport());
    dispatch(fetchSalesByProduct());
  }, [dispatch]);

  return (
    <div className="dashboard">
      <h1>Welcome, {user?.full_name || user?.username}!</h1>
      
      <div className="dashboard-cards">
        <div className="card">
          <h3>Today's Sales</h3>
          <p className="amount">${dailyReport?.total_sales?.toFixed(2) || '0.00'}</p>
          <small>{dailyReport?.total_transactions || 0} transactions</small>
        </div>

        <div className="card">
          <h3>Average Transaction</h3>
          <p className="amount">${dailyReport?.average_transaction?.toFixed(2) || '0.00'}</p>
        </div>

        <div className="card">
          <h3>Total Tax</h3>
          <p className="amount">${dailyReport?.total_tax?.toFixed(2) || '0.00'}</p>
        </div>

        <div className="card">
          <h3>Discounts Given</h3>
          <p className="amount">${dailyReport?.total_discount?.toFixed(2) || '0.00'}</p>
        </div>
      </div>

      <div className="chart-container">
        <h2>Top Selling Products</h2>
        {salesByProduct && salesByProduct.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesByProduct.slice(0, 10)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total_revenue" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p>No sales data available</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
