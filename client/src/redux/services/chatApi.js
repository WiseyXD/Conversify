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
    }),
});

export const { useGetChatsByUserIdQuery } = chatApi;
