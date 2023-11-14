import { createSlice } from "@reduxjs/toolkit";
import cookie from "react-cookies";
import superagent from "superagent";
const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    ordersCount: 0,
    totalCash: 0,
    totalCashCollected: 0,
    completedOrdersCount: 0,
    remainingOders: 0,
  },
  reducers: {
    addToOrders(state, action) {
      state.orders.push(action.payload);
      return {
        ...state,
        ordersCount: state.orders.length,
        totalCash: (state.totalCash += action.payload.price),
        remainingOders: state.orders.length,
      };
    },

    removeFromOrders(state, action) {
      let deletedItem = state.orders.filter(
        (item) => item.id !== action.payload.id
      );
      let total = state.ordersCount - 1;

      return {
        orders: deletedItem,
        ordersCount: total,
        totalCash: (state.totalCash -= action.payload.price),
        remainingOders: state.orders.length,
      };
    },

    updateOrder(state, action) {
      const updatedOrders = state.orders.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });

      return {
        ...state,
        orders: updatedOrders,
      };
    },
  },
});

export const getRemoteData = () => async (dispatch, state) => {
  let myresult = await fetch(`${import.meta.env.VITE_DATABASE_URL}/orders`);
  let OrdersData = await myresult.json();
  console.log(OrdersData);
  OrdersData.forEach((item) => dispatch(addToOrders(item)));
};

export const addNewOrder = (item) => async (dispatch, state) => {
  const data = await superagent
    .post(`${import.meta.env.VITE_DATABASE_URL}/orders`)
    .set("authorization", `Bearer ${cookie.load("auth")}`)
    .send(item);
  if (data.body) {
    try {
      dispatch(addToOrders(data.body));
    } catch (e) {
      console.error(e);
    }
  }
};

export const deleteOrder = (item) => async (dispatch, state) => {
  const data = await superagent
    .delete(`${import.meta.env.VITE_DATABASE_URL}/orders/${item.id}`)
    .set("authorization", `Bearer ${cookie.load("auth")}`);
  if (data.body) {
    try {
      dispatch(removeFromOrders(item));
    } catch (e) {
      console.error(e);
    }
  }
};

export const updateOneOrder = (item) => async (dispatch, state) => {
  const data = await superagent
    .put(`${import.meta.env.VITE_DATABASE_URL}/orders/${item.id}`)
    .set("authorization", `Bearer ${cookie.load("auth")}`)
    .send(item);
  if (data.body) {
    try {
      dispatch(updateOrder(item));
    } catch (e) {
      console.error(e);
    }
  }
};

export const { addToOrders, removeFromOrders, updateOrder } = orderSlice.actions;
export default orderSlice.reducer;