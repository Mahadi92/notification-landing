import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./app.css";

import Home from "./components/Home";
import WagmiSignIn from "./components/wagmiSignIn";
import SignIn from "./components/SignIn";
import User from "./components/User";
import WagmiContext from "./contexts/wagmi/wagmiContext";
import TestNotification from "./components/TestNotification";
import Web3Context from "./contexts/web3/Web3Context";
import Landing from "./components/Landing";

function App() {
  // const { address, isConnected, connect, connectors, isLoading, pendingConnector, disconnect, error, signIn, signOut, signInLoading } =
  //     useContext(WagmiContext);
  const { connect, address, handleDisconnect } = useContext(Web3Context);

  const disconnectHandler = async () => {
    await handleDisconnect();
    // await signOut();
  };

  //   if (!address) return <SignIn connectHandler={connect} />;
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing disconnect={disconnectHandler} />} />
        {/* <Route path="/" element={<Home disconnect={disconnectHandler} />} /> */}
        <Route
          path="/testNotification"
          element={<TestNotification disconnect={disconnectHandler} />}
        />
        <Route path="/user" element={<User disconnect={disconnectHandler} />} />
      </Routes>
    </Router>
  );
}

export default App;
