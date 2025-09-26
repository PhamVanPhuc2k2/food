import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../axiosClient";

// lấy danh sách product theo filter
export const fetchProductsByFilters = createAsyncThunk(
  "products/fetchByFilters",
  async ({ category, sortBy, search, limit, page }) => {
    const query = new URLSearchParams();
    if (category) query.append("category", category);
    if (sortBy) query.append("sortBy", sortBy);
    if (search) query.append("search", search);
    if (limit) query.append("limit", limit);
    if (page) query.append("page", page);

    const response = await axiosClient.get(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/product/all-product?${query.toString()}`
    );
    return response.data;
  }
);

// chi tiết sản phẩm
export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (id) => {
    const response = await axiosClient.get(`/api/product/detail-product/${id}`);
    return response.data;
  }
);

// update sản phẩm
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, productData }) => {
    const response = await axiosClient.put(
      `/api/product/update-product/${id}`,
      productData
    );
    return response.data;
  }
);

// lấy sản phẩm tương tự
export const fetchSimilarProducts = createAsyncThunk(
  "products/fetchSimilarProducts",
  async ({ id }) => {
    const response = await axiosClient.get(`/api/product/similar/${id}`);
    return response.data?.data?.similarProducts || [];
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    categories: {}, // mỗi category sẽ là { items, loading, error, total }
    products: [],
    totalPage: 0,
    selectedProduct: null,
    similarProducts: [],
    loading: false,
    error: null,
    filters: {
      category: "",
      sortBy: "",
      search: "",
      page: 1,
      limit: 12,
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        category: "",
        sortBy: "",
        search: "",
        page: 1,
        limit: 8,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch products by filters
      .addCase(fetchProductsByFilters.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(fetchProductsByFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.products = action.payload.data || [];
        state.totalPage = action.payload.pagination.totalPage || 0;
      })
      .addCase(fetchProductsByFilters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // product detail
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.selectedProduct = action.payload.data;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // update product
      // update product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const updatedProduct = action.payload?.data || action.payload;

        const index = state.products.findIndex(
          (p) => p._id === updatedProduct._id
        );
        if (index !== -1) {
          state.products[index] = updatedProduct;
        }

        if (
          state.selectedProduct &&
          state.selectedProduct._id === updatedProduct._id
        ) {
          state.selectedProduct = updatedProduct;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // similar products
      .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
        state.similarProducts = action.payload;
      });
  },
});

export const { setFilters, clearFilters } = productsSlice.actions;
export default productsSlice.reducer;
