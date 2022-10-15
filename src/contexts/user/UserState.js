import UserContext from "./UserContext";
import { useReducer, useEffect } from "react";
import UserReducer, { initialState, localState } from "./UserReducer";
import axios from "axios";

const UserState = (props) => {
    // const [state, dispatch] = useReducer(UserReducer, initialState);
    const [state, dispatch] = useReducer(UserReducer, localState || initialState);
    console.log(state);
    useEffect(() => {
        console.log(state);
        localStorage.setItem("state", JSON.stringify(state));
    }, [state]);

    const refreshChannels = async (address) => {
        if (!address) return;
        const channelRes = await axios.get("link/links", {
            params: {
                address,
            },
        });
        const subscriptions = await axios.get("/subscribe/getSubscriptions", {
            params: {
                address,
            },
        });
        const userInfo = await axios.get("/users/getUserInfo", {
            params: {
                address,
            },
        });
        dispatch({
            type: "SET_CHANNELS_AND_SUBSCRIPTIONS",
            subscriptions: subscriptions.data,
            channels: channelRes.data,
            userInfo: userInfo.data,
        });
    };

    return (
        <UserContext.Provider
            value={{
                loginUser: state.loginUser,
                refreshChannels: refreshChannels,
                channels: state.channels,
                subscriptions: state.subscriptions,
                userInfo: state.userInfo
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
};

export default UserState;
