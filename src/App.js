import React, { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { db } from './firebase';

function WasherDash({ onNew, onBack }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const q = collection(db, 'orders');
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(data);
    });
    return () => unsub();
  }, []);

  const pending = orders.filter(o => o.status === 'pending').length;
  const washing = orders.filter(o => o.status === 'washing').length;
  const done = orders.filter(o => o.status === 'done').length;

  return (
    <div style={{
      minHeight: '100vh', background: '#0F0F13',
      display: 'flex', justifyContent: 'center', fontFamily: 'sans-serif'
    }}>
      <div style={{ width: '360px', padding: '28px 20px' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ color: '#6B6A80', margin: 0, fontSize: '13px' }}>Dashboard</p>
            <h2 style={{ color: '#F0EFF8', margin: '4px 0 0 0' }}>Ramesh 🧺</h2>
            <p style={{ color: '#6B6A80', margin: '2px 0 0 0', fontSize: '12px' }}>Himgiri Hostel</p>
          </div>
          <button onClick={onNew} style={{
            padding: '10px 16px', borderRadius: '12px', border: 'none',
            cursor: 'pointer',
            background: 'linear-gradient(135deg, #6C63FF, #8B84FF)',
            color: '#fff', fontWeight: '700', fontSize: '13px'
          }}>+ New</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginTop: '24px' }}>
          {[
            { label: 'Pending', value: pending, color: '#F5A623' },
            { label: 'Washing', value: washing, color: '#6C63FF' },
            { label: 'Done', value: done, color: '#22D47A' },
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

        {orders.length === 0 && (
          <div style={{ color: '#6B6A80', textAlign: 'center', marginTop: '40px', fontSize: '14px' }}>
            No orders yet. Create one!
          </div>
        )}

        {orders.map(order => (
          <div key={order.id} style={{
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
            }}>🧺</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: '#F0EFF8', fontWeight: '600', fontSize: '13px' }}>{order.rollNo}</div>
              <div style={{ color: '#6B6A80', fontSize: '12px' }}>{order.clothes}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {order.status !== 'done' && (
                <button onClick={async () => {
                  const next = order.status === 'pending' ? 'washing' : 'done';
                  await updateDoc(doc(db, 'orders', order.id), { status: next });
                }} style={{
                  padding: '4px 10px', borderRadius: '8px', border: 'none',
                  cursor: 'pointer', fontSize: '11px', fontWeight: '600',
                  background: 'rgba(108,99,255,0.18)', color: '#8B84FF',
                }}>
                  {order.status === 'pending' ? 'Start →' : 'Done →'}
                </button>
              )}
              <span style={{
                fontSize: '11px', fontWeight: '700',
                color: order.status === 'done' ? '#22D47A' : order.status === 'washing' ? '#6C63FF' : '#F5A623',
                background: order.status === 'done' ? 'rgba(34,212,122,0.12)' : order.status === 'washing' ? 'rgba(108,99,255,0.18)' : 'rgba(245,166,35,0.12)',
                padding: '3px 10px', borderRadius: '20px'
              }}>
                {order.status === 'done' ? 'Ready ✓' : order.status === 'washing' ? 'Washing' : 'Pending'}
              </span>
            </div>
          </div>
        ))}

        <button onClick={onBack} style={{
          width: '100%', marginTop: '8px', padding: '12px',
          borderRadius: '12px', border: '1.5px solid #2A2A38',
          background: 'transparent', color: '#6B6A80',
          fontWeight: '600', fontSize: '13px', cursor: 'pointer'
        }}>← Back to Login</button>

      </div>
    </div>
  );
}

function App() {
  const [role, setRole] = useState('student');
  const [screen, setScreen] = useState('login');
  const [rollNo, setRollNo] = useState('');
  const [clothes, setClothes] = useState('');

  // NEW ORDER SCREEN
  if (screen === 'newOrder') {
    return (
      <div style={{
        minHeight: '100vh', background: '#0F0F13',
        display: 'flex', justifyContent: 'center', fontFamily: 'sans-serif'
      }}>
        <div style={{ width: '360px', padding: '28px 20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

          <button onClick={() => setScreen('washerDash')} style={{
            background: 'none', border: 'none', color: '#6B6A80',
            fontSize: '14px', cursor: 'pointer', textAlign: 'left', padding: 0
          }}>← Back</button>

          <h2 style={{ color: '#F0EFF8', margin: 0 }}>New Order</h2>

          <div style={{
            background: '#17171F', border: '2px dashed #2A2A38',
            borderRadius: '20px', height: '140px',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer'
          }}>
            <div style={{ fontSize: '32px' }}>📷</div>
            <div style={{ color: '#6B6A80', fontSize: '13px' }}>Tap to click photo of clothes</div>
          </div>

          <div>
            <label style={{ color: '#6B6A80', fontSize: '12px', fontWeight: '600' }}>STUDENT ROLL NO</label>
            <input value={rollNo} onChange={e => setRollNo(e.target.value)}
              placeholder='e.g. 21BPH001' style={{
                marginTop: '8px', width: '100%', padding: '13px 16px',
                background: '#17171F', border: '1.5px solid #2A2A38',
                borderRadius: '12px', color: '#F0EFF8', fontSize: '14px',
                outline: 'none', boxSizing: 'border-box'
              }} />
          </div>

          <div>
            <label style={{ color: '#6B6A80', fontSize: '12px', fontWeight: '600' }}>CLOTHES DESCRIPTION</label>
            <input value={clothes} onChange={e => setClothes(e.target.value)}
              placeholder='e.g. 2 Shirts, 1 Jeans' style={{
                marginTop: '8px', width: '100%', padding: '13px 16px',
                background: '#17171F', border: '1.5px solid #2A2A38',
                borderRadius: '12px', color: '#F0EFF8', fontSize: '14px',
                outline: 'none', boxSizing: 'border-box'
              }} />
          </div>

          <button onClick={async () => {
            if (!rollNo || !clothes) {
              alert('Please fill all fields!');
              return;
            }
            try {
              await addDoc(collection(db, 'orders'), {
                rollNo: rollNo,
                clothes: clothes,
                status: 'pending',
                createdAt: serverTimestamp()
              });
              alert('Order created successfully!');
              setRollNo('');
              setClothes('');
              setScreen('washerDash');
            } catch (error) {
              alert('Error: ' + error.message);
            }
          }} style={{
            padding: '15px', borderRadius: '14px', border: 'none', cursor: 'pointer',
            background: 'linear-gradient(135deg, #6C63FF, #8B84FF)',
            color: '#fff', fontWeight: '700', fontSize: '15px'
          }}>Submit Order →</button>

        </div>
      </div>
    );
  }

  // WASHERMAN DASHBOARD
  if (screen === 'washerDash') {
    return <WasherDash onNew={() => setScreen('newOrder')} onBack={() => setScreen('login')} />;
  }

  // STUDENT DASHBOARD
  if (screen === 'dashboard') {
    return (
      <div style={{
        minHeight: '100vh', background: '#0F0F13',
        display: 'flex', justifyContent: 'center', fontFamily: 'sans-serif'
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
                background: '#17171F', border: '1.5px solid #2A2A38',
                borderRadius: '16px', padding: '16px'
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
              background: '#17171F', border: '1.5px solid #2A2A38',
              borderRadius: '16px', padding: '14px 16px',
              marginBottom: '10px', display: 'flex',
              alignItems: 'center', gap: '14px'
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
      minHeight: '100vh', background: '#0F0F13',
      display: 'flex', justifyContent: 'center',
      alignItems: 'center', fontFamily: 'sans-serif'
    }}>
      <div style={{
        width: '360px', padding: '40px 24px',
        display: 'flex', flexDirection: 'column', gap: '24px'
      }}>

        <div>
          <h1 style={{ color: '#F0EFF8', fontSize: '32px', margin: 0 }}>WashTrack</h1>
          <p style={{ color: '#6B6A80', margin: '6px 0 0 0' }}>NIT Hamirpur Hostel Laundry</p>
        </div>

        <div style={{
          display: 'flex', background: '#2A2A38',
          borderRadius: '12px', padding: '4px', gap: '4px'
        }}>
          {['student', 'washerman'].map(r => (
            <button key={r} onClick={() => setRole(r)} style={{
              flex: 1, padding: '10px', borderRadius: '9px',
              border: 'none', cursor: 'pointer',
              background: role === r ? '#6C63FF' : 'transparent',
              color: role === r ? '#fff' : '#6B6A80',
              fontWeight: '600', fontSize: '13px'
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
            marginTop: '8px', width: '100%', padding: '14px 16px',
            background: '#17171F', border: '1.5px solid #2A2A38',
            borderRadius: '12px', color: '#F0EFF8', fontSize: '15px',
            outline: 'none', boxSizing: 'border-box'
          }} />
        </div>

        <button onClick={() => setScreen(role === 'student' ? 'dashboard' : 'washerDash')} style={{
          padding: '15px', borderRadius: '14px', border: 'none', cursor: 'pointer',
          background: 'linear-gradient(135deg, #6C63FF, #8B84FF)',
          color: '#fff', fontWeight: '700', fontSize: '15px'
        }}>
          Send OTP →
        </button>

      </div>
    </div>
  );
}

export default App;