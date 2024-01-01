import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chatApi = createApi({
    reducerPath: "chatApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_QUERY_CHAT,
    }),
    endpoints: (builder) => ({
        getChatsByUserId: builder.query({
            query: (userId) => `${userId}`,
        }),
        createChat: builder.mutation({
            query: (credentials) => ({
                url: "",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: credentials,
            }),
        }),
    }),
});

export const { useGetChatsByUserIdQuery, useCreateChatMutation } = chatApi;
