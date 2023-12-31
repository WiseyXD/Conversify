import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_QUERY_USER,
        prepareHeaders: (headers, { getState }) => {
            const authState = getState().root.auth;
            const token = authState ? authState.token : null;
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
                return headers;
            }
        },
    }),
    endpoints: (builder) => ({
        getUserByUserId: builder.query({
            query: (userId) => `find/${userId}`,
        }),
    }),
});

export const { useGetUserByUserIdQuery } = userApi;
