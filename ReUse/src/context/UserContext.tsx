import axios from 'axios';
import React from 'react';
import { createContext, useReducer, useContext } from 'react';
import UserReducer, { initialState } from './UserReducer';

// const UserContext = createContext(initialState);
const UserContext = createContext(initialState);

export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(UserReducer, initialState);

    const loginUser = async (loginPayload) => {
        dispatch({ type: 'LOGIN_REQUEST' });
        loginPayload = {
            email: loginPayload.login,
            password: loginPayload.password
        };
        // const requestOptions = {
        //     method: 'POST',
        //     headers: {
        //         Accept: 'accept: text/plain',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(loginPayload)
        // };
        let response = await axios.post('http://192.168.3.8:5000/user/authenticate', loginPayload);

        let data = await response.data;
        console.log(data.id);
        if (data) {
            // let userDetails = await fetch(`${ApiEndpoints.users.currentUser}`, {
            //     method: 'GET',
            //     headers: {
            //         Accept: 'accept: text/plain',
            //         'Content-Type': 'application/json',
            //         Authorization: `${data.data}`
            //     }
            // });

            // let userDetails = await axios.get(`http://192.168.3.8:5000/user/${data.id}`);
            // let user = userDetails.data();

            // const encodedValue = encodeURIComponent(user.id);
            // let personDetail = await fetch(`${ApiEndpoints.people.personByUserId + encodedValue}`, {
            //     method: 'GET',
            //     headers: {
            //         Accept: 'accept: text/plain',
            //         'Content-Type': 'application/json'
            //     }
            // });
            // let person = await personDetail.json();
            let payloadConstructed = {
                // username: user.username,
                // id: user.id,
                // name: user.name
                name: data.user.email
            };
            dispatch({ type: 'LOGIN_SUCCESS', payload: payloadConstructed });
            return { payloadConstructed, error: false };
        }
        dispatch({
            type: 'LOGIN_FAILURE',
            payload: { errorMessage: data.message }
        });
        return { message: data.message, error: true };
    };

    const logoutUser = () => {
        dispatch({ type: 'LOGOUT' });
    };

    const value = {
        ...state,
        loginUser: loginUser,
        logoutUser: logoutUser
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const useUser = () => {
    const context = useContext(UserContext);

    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }

    return context;
};

export default useUser;
