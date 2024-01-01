import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const messageApi = createApi({
    reducerPath: "messageApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_QUERY_MESSAGE,
    }),
    endpoints: (builder) => ({
        getMessagesByChatId: builder.query({
            query: (chatId) => `${chatId}`,
        }),
        createMessage: builder.mutation({
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

export const { useCreateMessageMutation, useGetMessagesByChatIdQuery } =
    messageApi;
