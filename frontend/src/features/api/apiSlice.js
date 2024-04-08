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
    }),
    createInvoice: builder.mutation({
      queryFn: async (data, _, __, baseQuery) => {
        const items = [...data.items];
        delete data.items; // Removes the items from the initial request body as these will be sent in another request
        try {
          const invoiceResponse = await baseQuery({
            url: "invoice/create",
            method: "POST",
            body: JSON.stringify(data),
          });

          console.log(invoiceResponse);
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
    }),

    // Clients related endpoints
    getAllClients: builder.query({
      query: () => "clients",
      transformResponse: (response) => response.info,
    }),
    addClient: builder.mutation({
      query: (data) => ({
        url: "client/add/",
        method: "POST",
        body: data,
      }),
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
  useGetAllClientsQuery,
} = apiSlice;
