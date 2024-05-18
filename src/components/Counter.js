import React, { useState } from 'react';

function Counter() {
  
  const [count, setCount] = useState(0);
  
  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <div className = "quantity">
      
      <div className='Decrement'>
      <button onClick={decrement}>-</button>
      </div>
      <p>{count}</p>
      <div className='Increment'>
      <button onClick={increment}>+</button>
      </div>
    </div>
  );
}

export default Counter;