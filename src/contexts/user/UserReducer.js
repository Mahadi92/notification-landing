export const initialState = {
    user: null,
    channels: {},
    subscriptions: {},
    userInfo: {},
};

export const localState = JSON.parse(localStorage.getItem("state"));

console.log("state", localState);

export default function UserReducer(state, action) {
    if (action === null) {
        localStorage.removeItem("state");
        return initialState;
    }

    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.user,
            };
        case "SET_CHANNELS":
            return {
                ...state,
                channels: action.channels,
            };
        case "SET_SUBSCRIPTIONS":
            return {
                ...state,
                subscriptions: action.subscriptions,
            };
        case "SET_CHANNELS_AND_SUBSCRIPTIONS":
            return {
                ...state,
                channels: action.channels,
                subscriptions: action.subscriptions,
                userInfo: action.userInfo
            }
        default:
            return state;
    }
}
