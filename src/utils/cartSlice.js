// import { createSlice } from "@reduxjs/toolkit";

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     items: [],

//   },

//   reducers: {
//     addItem: (state, action) => {

//       state.items.push(action.payload);

//     },

//     removeItem: (state, action) => {
//       state.items.pop();
//     },
//     clearCart: (state) => {
//       state.items = [];
//     },
//   },
// });
// export const { addItem, removeItem, clearCart } = cartSlice.actions;
// export default cartSlice.reducer;

import { createSlice, current } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    increment: (state, action) => {
      console.log(current(state.items));
      const temp = state.items.map((item) => {
        console.log(item);

        if (item._id === action.payload?._id) {
          return {
            ...item,
            quantity: item?.quantity + 1,
          };
        } else return item;
      });
      console.log(temp, "temp");
      state.items = temp;
    },
    decrement: (state, action) => {
      const temp = state.items
        .map((item) => {
          if (item._id === action.payload?._id) {
            if (item.quantity > 1) {
              return {
                ...item,
                quantity: item.quantity - 1,
              };
            } else {
              return null;
            }
          } else {
            return item;
          }
        })
        .filter((item) => item !== null);

      state.items = temp;
    },

    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      state.items.pop();
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearCart, increment, decrement } =
  cartSlice.actions;
export default cartSlice.reducer;
