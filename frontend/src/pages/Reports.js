import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions, fetchDailySalesReport, fetchSalesByProduct } from '../redux/slices/transactionSlice';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../styles/Reports.css';

function Reports() {
  const dispatch = useDispatch();
  const { transactions, dailyReport, salesByProduct } = useSelector(state => state.transaction);
  const [dateRange, setDateRange] = useState('today');

  useEffect(() => {
    dispatch(fetchTransactions());
    dispatch(fetchDailySalesReport());
    dispatch(fetchSalesByProduct());
  }, [dispatch, dateRange]);

  const topProducts = salesByProduct?.slice(0, 10) || [];

  return (
    <div className="reports-page">
      <h1>Sales Reports & Analytics</h1>

      <div className="report-filters">
        <label>Date Range:</label>
        <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
      </div>

      {dailyReport && (
        <div className="report-summary">
          <div className="summary-card">
            <h3>Total Sales</h3>
            <p className="amount">${dailyReport.total_sales?.toFixed(2) || '0.00'}</p>
            <small>{dailyReport.total_transactions || 0} transactions</small>
          </div>
          <div className="summary-card">
            <h3>Average Transaction</h3>
            <p className="amount">${dailyReport.average_transaction?.toFixed(2) || '0.00'}</p>
          </div>
          <div className="summary-card">
            <h3>Tax Collected</h3>
            <p className="amount">${dailyReport.total_tax?.toFixed(2) || '0.00'}</p>
          </div>
          <div className="summary-card">
            <h3>Discounts</h3>
            <p className="amount">${dailyReport.total_discount?.toFixed(2) || '0.00'}</p>
          </div>
        </div>
      )}

      <div className="chart-container">
        <h2>Top Selling Products</h2>
        {topProducts.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProducts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total_revenue" fill="#8884d8" name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p>No data available</p>
        )}
      </div>

      <div className="chart-container">
        <h2>Product Sales Volume</h2>
        {topProducts.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProducts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total_quantity_sold" fill="#82ca9d" name="Units Sold" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p>No data available</p>
        )}
      </div>

      <div className="sales-table">
        <h2>Recent Transactions</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Date</th>
              <th>Items</th>
              <th>Subtotal</th>
              <th>Tax</th>
              <th>Total</th>
              <th>Payment Method</th>
            </tr>
          </thead>
          <tbody>
            {transactions?.slice(0, 20).map(transaction => (
              <tr key={transaction.id}>
                <td>{transaction.transaction_number}</td>
                <td>{new Date(transaction.created_at).toLocaleDateString()}</td>
                <td>-</td>
                <td>${transaction.subtotal.toFixed(2)}</td>
                <td>${transaction.tax.toFixed(2)}</td>
                <td>${transaction.total.toFixed(2)}</td>
                <td>{transaction.payment_method}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reports;