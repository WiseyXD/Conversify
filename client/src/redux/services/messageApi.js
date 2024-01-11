import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const messageApi = createApi({
    reducerPath: "messageApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_QUERY_MESSAGE,
    }),
    tagTypes: ["Messages"],
    endpoints: (builder) => ({
        getMessagesByChatId: builder.query({
            query: (chatId) => `${chatId}`,
            providesTags: ["Messages"],
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
            invalidatesTags: ["Messages"],
        }),
    }),
});

export const { useCreateMessageMutation, useGetMessagesByChatIdQuery } =
    messageApi;
