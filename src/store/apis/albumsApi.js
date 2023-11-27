import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';

//DEV ONLY !!!
const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
}

const albumsApi = createApi({
    reducerPath: 'albums',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005',
        //START - REMOVE FOR PRODUCTION!!!
        fetchFn: async (...arg) => {
            await pause(1000);
            return fetch(...arg);
        }
        // END
    }),
    endpoints(builder) {
        return {
            /* FETCHING ALBUMS */
            fetchAlbums: builder.query({
                // providesTags: (result, error, user) => {
                //     return [{
                //         type:  'Album',
                //         id: user.id,
                //     }];
                // },
                providesTags: (result, error, user) => {
                    const tags = result.map((album) => {
                        return { type: 'Album', id: album.id };
                    });
                    tags.push({ type: 'UsersAlbums', id: user.id });
                    return tags;
                },
                query: (user) => {
                    return {
                        url: '/albums',
                        params: {
                            userId: user.id
                        },
                        method: 'GET',
                    }
                }
            }),
            /* ADDING ALBUM  */
            addAlbum: builder.mutation({
                invalidatesTags: (result, error, user) => {
                    return [{ type: 'UsersAlbums', id: user.id }];
                },
                query: (user) => {
                    return {
                        url: '/albums',
                        method: 'POST',
                        body: {
                            userId: user.id,
                            title: faker.commerce.productName()
                        }
                    }
                }
            }),
            /* REMOVING ALBUM  */
            removeAlbum: builder.mutation({
                invalidatesTags: (result, error, album) => {
                    return [{ type: 'Album', id: album.id }];
                },
                query: (album) => {
                    return {
                        url: `/albums/${album.id}`,
                        method: 'DELETE',
                    }
                }
            }),
        }
    }
});


export const { 
    useFetchAlbumsQuery, 
    useAddAlbumMutation,
    useRemoveAlbumMutation,
}  = albumsApi;
export { albumsApi }; 