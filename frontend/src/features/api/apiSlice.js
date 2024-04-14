import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setTokens } from "../authentication/authSlice";

//  TODO: Extend base query to handle jwt expiration.

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    prepareHeaders: (headers, { getState, type, endpoint }) => {
      const token = getState().auth.tokens?.current;
      if (type === "mutation" && endpoint !== "addClient") {
        headers.set("Content-Type", "application/json");
      }

      if (endpoint === "addClient") {
        headers.set("Content-Type", "multipart/form-data");
      }

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    },
  }),
  tagTypes: ["invoice", "client"],
  endpoints: (builder) => ({
    // auth related endpoints
    login: builder.mutation({
      queryFn: async (data, { dispatch }, __, baseQuery) => {
        try {
          const loginResponse = await baseQuery({
            url: "login",
            method: "POST",
            body: JSON.stringify(data),
          });

          if (!loginResponse.data) {
            throw loginResponse.error;
          }
          const { token, refreshToken, userId } = loginResponse.data;

          dispatch(setTokens({ current: token, refresh: refreshToken }));

          const userResponse = await baseQuery({
            url: `user/${userId}`,
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          return {
            data: {
              ...userResponse.data.data,
            },
          };
        } catch (error) {
          return { error };
        }
      },
    }),
    signup: builder.mutation({
      query: (data) => ({
        url: "signup",
        method: "POST",
        body: JSON.stringify(data),
      }),
    }),
    getUser: builder.query({
      query: (id) => `user/${id}`,
    }),
    // invoice related endpoints
    getInvoices: builder.query({
      query: () => "invoice",
      transformResponse: (response) => response.data,
      providesTags: ["invoice"],
    }),
    createInvoice: builder.mutation({
      queryFn: async (invoiceData, _, __, baseQuery) => {
        const { items, ...data } = invoiceData;

        try {
          const invoiceResponse = await baseQuery({
            url: "invoice/create",
            method: "POST",
            body: JSON.stringify(data),
          });

          console.log(invoiceResponse);

          if (!invoiceResponse.data?.id) {
            throw invoiceResponse.error;
          }

          items.forEach(async (item) => {
            const response = await baseQuery({
              url: `item/add/${invoiceResponse.data.id}`,
              method: "POST",
              body: JSON.stringify(item),
            });

            console.log(response.data);
          });

          return { data: invoiceResponse.data };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["invoice"],
    }),
    getInvoicebyId: builder.query({
      query: (id) => `/invoice/${id}`,
      transformResponse: (res) => res.data,
    }),

    // Clients related endpoints
    getClients: builder.query({
      query: () => "clients",
      transformResponse: (response) => response.info,
      providesTags: ["client"],
    }),
    addClient: builder.mutation({
      query: (data) => ({
        url: "client/add/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["client"],
    }),
  }),
});

export const {
  useAddClientMutation,
  useGetInvoicesQuery,
  useLoginMutation,
  useSignupMutation,
  useLazyGetUserQuery,
  useCreateInvoiceMutation,
  useGetClientsQuery,
  useGetInvoicebyIdQuery,
} = apiSlice;
