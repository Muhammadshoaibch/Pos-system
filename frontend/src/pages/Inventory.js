import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/productSlice';
import '../styles/Inventory.css';

function Inventory() {
  const dispatch = useDispatch();
  const { products } = useSelector(state => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const lowStockProducts = products.filter(p => p.quantity_in_stock <= 10);
  const outOfStockProducts = products.filter(p => p.quantity_in_stock === 0);
  const totalInventoryValue = products.reduce((sum, p) => sum + (p.cost * p.quantity_in_stock), 0);

  return (
    <div className="inventory-page">
      <h1>Inventory Management</h1>

      <div className="inventory-stats">
        <div className="stat-card">
          <h3>Total Products</h3>
          <p className="stat-value">{products.length}</p>
        </div>
        <div className="stat-card">
          <h3>Out of Stock</h3>
          <p className="stat-value" style={{ color: '#dc3545' }}>{outOfStockProducts.length}</p>
        </div>
        <div className="stat-card">
          <h3>Low Stock</h3>
          <p className="stat-value" style={{ color: '#ffc107' }}>{lowStockProducts.length}</p>
        </div>
        <div className="stat-card">
          <h3>Inventory Value</h3>
          <p className="stat-value">${totalInventoryValue.toFixed(2)}</p>
        </div>
      </div>

      <div className="inventory-section">
        <h2>Out of Stock Items</h2>
        {outOfStockProducts.length === 0 ? (
          <p>No out of stock items</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>SKU</th>
                <th>Category</th>
                <th>Reorder Level</th>
              </tr>
            </thead>
            <tbody>
              {outOfStockProducts.map(product => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.sku}</td>
                  <td>{product.category_name || 'N/A'}</td>
                  <td>{product.reorder_level}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="inventory-section">
        <h2>Low Stock Items</h2>
        {lowStockProducts.length === 0 ? (
          <p>No low stock items</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>SKU</th>
                <th>Current Stock</th>
                <th>Reorder Level</th>
                <th>Unit Cost</th>
                <th>Stock Value</th>
              </tr>
            </thead>
            <tbody>
              {lowStockProducts.map(product => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.sku}</td>
                  <td>
                    <span className="badge warning">{product.quantity_in_stock}</span>
                  </td>
                  <td>{product.reorder_level}</td>
                  <td>${product.cost?.toFixed(2) || '0.00'}</td>
                  <td>${(product.cost * product.quantity_in_stock).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="inventory-section">
        <h2>All Products</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Product</th>
              <th>SKU</th>
              <th>Current Stock</th>
              <th>Unit Cost</th>
              <th>Selling Price</th>
              <th>Stock Value</th>
              <th>Margin</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => {
              const margin = ((product.price - product.cost) / product.price * 100).toFixed(2);
              return (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.sku}</td>
                  <td>
                    <span className={product.quantity_in_stock > 0 ? 'badge success' : 'badge danger'}>
                      {product.quantity_in_stock}
                    </span>
                  </td>
                  <td>${product.cost?.toFixed(2) || '0.00'}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>${(product.cost * product.quantity_in_stock).toFixed(2)}</td>
                  <td>{margin}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Inventory;