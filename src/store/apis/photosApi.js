import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';

//DEV ONLY !!!
const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
}

const photosApi = createApi({
    reducerPath: 'photos',
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
            /* FETCHING IMAGE */
            fetchPhotos: builder.query({
                providesTags: (result, error, album) => {
                    const tags = result.map((photo) => {
                        return { type: 'Photo', id: photo.id };
                    });
                    tags.push({ type: 'AlbumPhoto', id: album.id });
                    return tags;
                },
                query: (album) => {
                    return {
                        url: '/photos',
                        method: 'GET',
                        params: {
                            albumId: album.id
                        }
                    }
                }
            }),
            /* ADDING IMAGE */
            addPhoto: builder.mutation({
                invalidatesTags: (result, error, album ) => {
                    return [{ type: 'AlbumPhoto', id: album.id }];
                },
                query: (album) => {
                    return {
                        url: '/photos',
                        method: 'POST',
                        body: {
                            albumId: album.id,
                            url: faker.image.url({width: 150, height: 150}),
                            title: faker.commerce.productName()
                        }
                    }
                }
            }),
            /* REMOVING IMAGE */
            removePhoto: builder.mutation({
                invalidatesTags: (result, error, photo) => {
                    return [{ type: 'Photo', id: photo.id }];
                },
                query: (photo) => {
                    return {
                        url: `/photos/${photo.id}`,
                        method: 'DELETE'
                    }
                }
            })
        }
    }
});


export const { 
    useFetchPhotosQuery,
    useAddPhotoMutation,
    useRemovePhotoMutation
}  = photosApi;
export { photosApi }; 