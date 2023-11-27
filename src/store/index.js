import { configureStore } from '@reduxjs/toolkit';
import { usersReducer } from './slices/usersSlice';

import { setupListeners } from '@reduxjs/toolkit/query';
import { albumsApi } from './apis/albumsApi';
import { photosApi } from './apis/photosApi';

export const store = configureStore({
   reducer: {
       users: usersReducer, //reduxjs/toolkit'
       [albumsApi.reducerPath]: albumsApi.reducer, // reduxjs/toolkit/query
       [photosApi.reducerPath]: photosApi.reducer, // reduxjs/toolkit/query
       //[albumsApi.reducerPath]: albumsApi.reducer === albums: albumsApi.reducer
   },
   middleware: (getDefaultMiddleware) => { // reduxjs/toolkit/query
        return getDefaultMiddleware()
            .concat(albumsApi.middleware)
            .concat(photosApi.middleware);
   }
})

setupListeners(store.dispatch); // reduxjs/toolkit/query

export * from './thunks/fetchUsers';   //reduxjs/toolkit'
export * from './thunks/addUser';      //reduxjs/toolkit'
export * from './thunks/removeUser';   //reduxjs/toolkit'

export { 
    useFetchAlbumsQuery,
    useAddAlbumMutation,
    useRemoveAlbumMutation,
} from './apis/albumsApi'; // reduxjs/toolkit/query

export {
    useFetchPhotosQuery,
    useAddPhotoMutation,
    useRemovePhotoMutation
} from './apis/photosApi';