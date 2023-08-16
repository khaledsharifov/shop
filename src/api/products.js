import { createAsyncThunk } from "@reduxjs/toolkit";

const url = "https://my-json-server.typicode.com/khaledsharifov/shop";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (id) => {
    console.log(id);
    try {
      const response = await fetch(url + "/products");
      const data = await response.json();

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getProductById = createAsyncThunk(
  "products/getProductsById",
  async (id) => {
    try {
      const response = await fetch(url + "/products/" + id);
      const data = await response.json();

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getProductsBasket = createAsyncThunk(
  "productsBasket/getProductsBasket",
  async () => {
    try {
      const response = await fetch(url + "/basket");
      const data = await response.json();

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const postProduct = createAsyncThunk(
  "products/postProduct",
  async (elem, { dispatch }) => {
    try {
      const response = await fetch(url + "/basket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(elem),
      });
      const data = await response.json();
      dispatch(getProductsBasket());
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const postProductsOrders = createAsyncThunk(
  "products/postProductsOrders",
  async (orders) => {
    try {
      const response = await fetch(url + "/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orders),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "basket/deleteProduct",
  async (id, { dispatch }) => {
    try {
      const response = await fetch(url + "/basket/" + id, {
        method: "DELETE",
      });
      const data = await response.json();
      dispatch(getProductsBasket());
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
