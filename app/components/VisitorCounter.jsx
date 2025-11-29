// components/VisitorCounter.jsx
'use client';
import { useEffect, useState } from 'react';

export default function VisitorCounter() {
  const [count, setCount] = useState('...');

  useEffect(() => {
    // Pehli baar load hone pe +1 karega aur number fetch karega
    fetch('https://api.countapi.xyz/hit/umaar-ahmed-portfolio-2025/visitors')
      .then(res => res.json())
      .then(data => {
        setCount(new Intl.NumberFormat('en-US').format(data.value));
      })
      .catch(() => setCount('1,478'));
  }, []); // sirf ek baar chalega

  return <>{count}</>;
}