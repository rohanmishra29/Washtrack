import React, { useState } from 'react';

function App() {
  const [role, setRole] = useState('student');
  const [screen, setScreen] = useState('login');
if (screen === 'dashboard') {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0F0F13',
      display: 'flex',
      justifyContent: 'center',
      fontFamily: 'sans-serif'
    }}>
      <div style={{ width: '360px', padding: '28px 20px' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ color: '#6B6A80', margin: 0, fontSize: '13px' }}>Welcome back,</p>
            <h2 style={{ color: '#F0EFF8', margin: '4px 0 0 0' }}>Rohan 👋</h2>
            <p style={{ color: '#6B6A80', margin: '2px 0 0 0', fontSize: '12px' }}>Himgiri · Room 204</p>
          </div>
          <div style={{
            width: '40px', height: '40px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #6C63FF, #8B84FF)',
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', color: '#fff', fontWeight: '800'
          }}>R</div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '24px' }}>
          {[
            { label: 'Active Orders', value: '2', icon: '🧺', color: '#6C63FF' },
            { label: 'Ready to Pick', value: '1', icon: '✅', color: '#22D47A' },
          ].map(c => (
            <div key={c.label} style={{
              background: '#17171F',
              border: '1.5px solid #2A2A38',
              borderRadius: '16px',
              padding: '16px'
            }}>
              <div style={{ fontSize: '24px' }}>{c.icon}</div>
              <div style={{ color: c.color, fontSize: '26px', fontWeight: '800', marginTop: '4px' }}>{c.value}</div>
              <div style={{ color: '#6B6A80', fontSize: '12px' }}>{c.label}</div>
            </div>
          ))}
        </div>

        {/* Orders */}
        <h3 style={{ color: '#F0EFF8', marginTop: '24px' }}>Your Orders</h3>
        {[
          { id: 'ORD001', clothes: '2 Shirts, 1 Jeans', date: 'May 10', status: 'done', emoji: '👕' },
          { id: 'ORD002', clothes: '3 T-shirts, 2 Trousers', date: 'May 11', status: 'washing', emoji: '👔' },
        ].map(order => (
          <div key={order.id} style={{
            background: '#17171F',
            border: '1.5px solid #2A2A38',
            borderRadius: '16px',
            padding: '14px 16px',
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px'
          }}>
            <div style={{
              width: '46px', height: '46px', borderRadius: '12px',
              background: 'rgba(108,99,255,0.18)',
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: '22px'
            }}>{order.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: '#F0EFF8', fontWeight: '600', fontSize: '14px' }}>{order.clothes}</div>
              <div style={{ color: '#6B6A80', fontSize: '12px', marginTop: '2px' }}>Given on {order.date}</div>
            </div>
            <span style={{
              fontSize: '11px', fontWeight: '700',
              color: order.status === 'done' ? '#22D47A' : '#6C63FF',
              background: order.status === 'done' ? 'rgba(34,212,122,0.12)' : 'rgba(108,99,255,0.18)',
              padding: '3px 10px', borderRadius: '20px'
            }}>
              {order.status === 'done' ? 'Ready ✓' : 'Washing'}
            </span>
          </div>
        ))}

        {/* Logout */}
        <button onClick={() => setScreen('login')} style={{
          width: '100%', marginTop: '8px', padding: '12px',
          borderRadius: '12px', border: '1.5px solid #2A2A38',
          background: 'transparent', color: '#6B6A80',
          fontWeight: '600', fontSize: '13px', cursor: 'pointer'
        }}>← Back to Login</button>

      </div>
    </div>
  );
}
}

export default App;