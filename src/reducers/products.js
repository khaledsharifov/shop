import { createSlice } from "@reduxjs/toolkit";
import { deleteProduct, getProductById, getProducts, getProductsBasket, postProduct, postProductsOrders } from "../api/products";

const setLoading = (state) => {
  state.loading = true;
};

export const slice = createSlice({
  name: "products",
  initialState: {
    list: [],
    loading: false,
    selectByCategory: "",
    priceMin: 0,
    priceMax: 0,
    brands: [],
    search: "",
    getBasket:[],
    disabled: true,
    orders: [],
    name: "",
    phone: "",
    product:{}
  },

  reducers: {
    filterByCategory(state, action) {
      state.selectByCategory = action.payload;
    },
    filterByPriceMin(state, action) {
      state.priceMin = action.payload;
    },
    filterByPriceMax(state, action) {
      state.priceMax = action.payload;
    },
    setBrandsPush(state, action) {
      state.brands.push(action.payload);
    },
    setBrandsPop(state, action) {
      state.brands.pop(action.payload);
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
    setDisabled(state, action) {
      state.disabled = action.payload;
    },
    setName(state, action){
      state.name = action.payload
    },
    setPhone(state, action){
      state.phone = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, setLoading);
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload;
    });
    builder.addCase(getProducts.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getProductById.pending, setLoading);
    builder.addCase(getProductById.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
    });
    builder.addCase(getProductById.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getProductsBasket.pending, setLoading);
    builder.addCase(getProductsBasket.fulfilled, (state, action) => {
      state.loading = false;
      state.getBasket = action.payload;
    });
    builder.addCase(getProductsBasket.rejected, (state) => {
      state.loading = false;
    });


    
    builder.addCase(postProduct.pending, setLoading);
    builder.addCase(postProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.basket = action.payload
    });
    builder.addCase(postProduct.rejected, (state) => {
      state.loading = false;
    });

        
    builder.addCase(postProductsOrders.pending, setLoading);
    builder.addCase(postProductsOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload
    });
    builder.addCase(postProductsOrders.rejected, (state) => {
      state.loading = false;
    });


    builder.addCase(deleteProduct.pending, setLoading);
    builder.addCase(deleteProduct.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteProduct.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const {
  filterByCategory,
  filterByPriceMin,
  filterByPriceMax,
  setBrandsPush,
  setBrandsPop,
  setSearch,
  setBasket,
  setDisabled,
  setName,
  setPhone,
} = slice.actions;

export default slice.reducer;
