import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {API_BASE_URL} from "../../utils/API_CONFIG";

export const postsApi = createApi({
    reducerPath: 'postsApi',
    tagTypes: ['Posts'],
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL,
    }),
    keepUnusedDataFor: 60,

    endpoints: build => ({
        getPosts: build.query({
            query: (arg) => 'posts',
            providesTags: result => {
                return result
                    ? [...result.map(({id}) => ({type: 'Posts', id})),
                        {type: 'Posts', id: 'List'}]
                    : [{type: 'Posts', id: 'List'}]
            },
        }),

        getPostsById: build.query({
            query: (postId = 1) => `posts/${postId}`,
        }),

        createPost: build.mutation({
            query: data => ({
                url: 'posts',
                method: 'POST',
                body: {
                    userId: 1,
                    ...data
                },
            }),
            invalidatesTags: [{type: 'Posts', id: 'List'}],
        }),

        updatePost: build.mutation({
            query: ({id, ...postsData}) => ({
                url: `posts/${id}`,
                method: 'PUT',
                body: postsData
            }),
            invalidatesTags: [{type: 'Posts', id: 'List'}],
        }),

        deletePost: build.mutation({
            query: (id = 1) => ({
                url: `posts/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: [{type: 'Posts', id: 'List'}],
        }),

        getComments: build.query({
            query: (postId = 1) => `posts/${postId}/comments`,
        }),
    }),
});

export const {
    useGetPostsQuery,
    useGetPostsByIdQuery,
    useCreatePostMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
    useGetCommentsQuery
} = postsApi;