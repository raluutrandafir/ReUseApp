export const initialState = {
    id: '',
    name: '',
    username: '',

    loginUser: async () => {
        return Promise<void>;
    },
    logoutUser: () => {}
};

const UserReducer = (state: any, action: any) => {
    const { type, payload } = action;

    switch (type) {
        case 'LOGIN_REQUEST':
            return {
                ...state,
                errorMessage: ''
            };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                id: payload.id,
                name: payload.name,
                username: payload.username,

                errorMessage: ''
            };
        case 'LOGIN_FAILURE':
            return {
                ...state,
                errorMessage: payload.errorMessage
            };
        case 'LOGOUT': {
            return {
                ...state,

                id: '',
                name: '',

                username: '',
                errorMessage: ''
            };
        }
        default:
            throw new Error(`Unhandled action type: ${type}`);
    }
};

export default UserReducer;
