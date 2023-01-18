import create from 'zustand';

type userId = string | null;
type userUsername = string;

type State = {
    userId: userId;
    userUsername: userUsername;
    setUserId: (newUserId: userId) => void;
    setUsername: (usermane: userUsername) => void;
    resetUserId: () => void;
};

const useUserStore = create<State>((set) => ({
    userId: null,
    userUsername: '',
    setUserId: (newUserId) => {
        set(() => ({ userId: newUserId }));
    },
    setUsername: (username) => {
        set(() => ({ userUsername: username }));
    },
    resetUserId: () => {
        set(() => ({ userId: null }));
    }
}));

export { useUserStore };
