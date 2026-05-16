import React, { useState } from 'react';

function App() {
  const [role, setRole] = useState('student');
  const [screen, setScreen] = useState('login');

  // WASHERMAN DASHBOARD
  if (screen === 'washerDash') {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#0F0F13',
        display: 'flex',
        justifyContent: 'center',
        fontFamily: 'sans-serif'
      }}>
        <div style={{ width: '360px', padding: '28px 20px' }}>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: '#6B6A80', margin: 0, fontSize: '13px' }}>Dashboard</p>
              <h2 style={{ color: '#F0EFF8', margin: '4px 0 0 0' }}>Ramesh 🧺</h2>
              <p style={{ color: '#6B6A80', margin: '2px 0 0 0', fontSize: '12px' }}>Himgiri Hostel</p>
            </div>
            <button onClick={() => setScreen('newOrder')} style={{
              padding: '10px 16px', borderRadius: '12px', border: 'none',
              cursor: 'pointer',
              background: 'linear-gradient(135deg, #6C63FF, #8B84FF)',
              color: '#fff', fontWeight: '700', fontSize: '13px'
            }}>+ New</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginTop: '24px' }}>
            {[
              { label: 'Pending', value: 1, color: '#F5A623' },
              { label: 'Washing', value: 1, color: '#6C63FF' },
              { label: 'Done', value: 1, color: '#22D47A' },
            ].map(c => (
              <div key={c.label} style={{
                background: '#17171F', border: '1.5px solid #2A2A38',
                borderRadius: '14px', padding: '12px', textAlign: 'center'
              }}>
                <div style={{ color: c.color, fontSize: '22px', fontWeight: '800' }}>{c.value}</div>
                <div style={{ color: '#6B6A80', fontSize: '11px' }}>{c.label}</div>
              </div>
            ))}
          </div>

          <h3 style={{ color: '#F0EFF8', marginTop: '24px' }}>All Orders</h3>
          {[
            { student: 'Rohan Sharma', room: '204', clothes: '2 Shirts, 1 Jeans', status: 'done', emoji: '👕' },
            { student: 'Aditya Kumar', room: '110', clothes: '3 T-shirts', status: 'washing', emoji: '👔' },
            { student: 'Priya Singh', room: '305', clothes: '4 Kurtas', status: 'pending', emoji: '👗' },
          ].map((order, i) => (
            <div key={i} style={{
              background: '#17171F', border: '1.5px solid #2A2A38',
              borderRadius: '16px', padding: '14px 16px',
              marginBottom: '10px', display: 'flex',
              alignItems: 'center', gap: '12px'
            }}>
              <div style={{
                width: '42px', height: '42px', borderRadius: '10px',
                background: 'rgba(108,99,255,0.18)',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '20px'
              }}>{order.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ color: '#F0EFF8', fontWeight: '600', fontSize: '13px' }}>{order.student}</div>
                <div style={{ color: '#6B6A80', fontSize: '12px' }}>Room {order.room} · {order.clothes}</div>
              </div>
              <span style={{
                fontSize: '11px', fontWeight: '700',
                color: order.status === 'done' ? '#22D47A' : order.status === 'washing' ? '#6C63FF' : '#F5A623',
                background: order.status === 'done' ? 'rgba(34,212,122,0.12)' : order.status === 'washing' ? 'rgba(108,99,255,0.18)' : 'rgba(245,166,35,0.12)',
                padding: '3px 10px', borderRadius: '20px'
              }}>
                {order.status === 'done' ? 'Ready ✓' : order.status === 'washing' ? 'Washing' : 'Pending'}
              </span>
            </div>
          ))}

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

  // STUDENT DASHBOARD
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

  // LOGIN SCREEN
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0F0F13',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'sans-serif'
    }}>
      <div style={{
        width: '360px',
        padding: '40px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}>

        <div>
          <h1 style={{ color: '#F0EFF8', fontSize: '32px', margin: 0 }}>WashTrack</h1>
          <p style={{ color: '#6B6A80', margin: '6px 0 0 0' }}>NIT Hamirpur Hostel Laundry</p>
        </div>

        <div style={{
          display: 'flex',
          background: '#2A2A38',
          borderRadius: '12px',
          padding: '4px',
          gap: '4px'
        }}>
          {['student', 'washerman'].map(r => (
            <button key={r} onClick={() => setRole(r)} style={{
              flex: 1,
              padding: '10px',
              borderRadius: '9px',
              border: 'none',
              cursor: 'pointer',
              background: role === r ? '#6C63FF' : 'transparent',
              color: role === r ? '#fff' : '#6B6A80',
              fontWeight: '600',
              fontSize: '13px'
            }}>
              {r === 'student' ? '👨‍🎓 Student' : '🧺 Washerman'}
            </button>
          ))}
        </div>

        <div>
          <label style={{ color: '#6B6A80', fontSize: '12px', fontWeight: '600' }}>
            PHONE NUMBER
          </label>
          <input placeholder='+91 98XXX XXXXX' style={{
            marginTop: '8px',
            width: '100%',
            padding: '14px 16px',
            background: '#17171F',
            border: '1.5px solid #2A2A38',
            borderRadius: '12px',
            color: '#F0EFF8',
            fontSize: '15px',
            outline: 'none',
            boxSizing: 'border-box'
          }} />
        </div>

        <button onClick={() => setScreen(role === 'student' ? 'dashboard' : 'washerDash')} style={{
          padding: '15px',
          borderRadius: '14px',
          border: 'none',
          cursor: 'pointer',
          background: 'linear-gradient(135deg, #6C63FF, #8B84FF)',
          color: '#fff',
          fontWeight: '700',
          fontSize: '15px'
        }}>
          Send OTP →
        </button>

      </div>
    </div>
  );
}

export default App;