import React, { useState } from 'react';

function Counter() {
  
  const [count, setCount] = useState(1);
  
  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div className = "flex gap-2">
      
      <div class="flex items-center justify-center">
    <button class="w-8 h-8 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 focus:outline-none" onClick={decrement}>-</button>
    <p class="mx-4 text-lg font-semibold">{count}</p>
    <button class="w-8 h-8 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 focus:outline-none" onClick={increment}>+</button>
</div>
    </div>
  );
}

export default Counter;