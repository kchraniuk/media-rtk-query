import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
/*
* GOOD TO KNOW:
*   CreateAsyncThunk accepts three parameters: the first one is string action 'type' value.
*   A string that will be used to generate additional Redux action type constants, representing the lifecycle of an async request:
*   For example, a type argument of 'users/fetch' will generate these action types:
*
*  pending: 'users/fetch/pending'
*  fulfilled: 'users/fetch/fulfilled'
*  rejected: 'users/fetch/rejected'
*
*   to get these values just:
*   fetchUsers.pending
*   fetchUsers.fulfilled
*   fetchUsers.rejected
*
*   fetchUsers.pending === 'users/fetch/pending'
*   fetchUsers.fulfilled === 'users/fetch/fulfilled'
*   fetchUsers.rejected === 'users/fetch/rejected'
*/
const fetchUsers = createAsyncThunk('users/fetch', async () => {
    const response = await axios.get('http://localhost:3005/users');

    //dev only!!!
    await pause(2500);

   // cokolwiek zwrocimy w response.data 
   // zostanie automatycznie przypisane do właściwości payload do przypisanego typu akcji.
    return response.data;
});

//DEV ONLY !!!
const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
}

export { fetchUsers };