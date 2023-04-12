import React from "react";
import "./App.css";
import "antd/dist/reset.css";
import AppRouter from "./pages/AppRouter";
import { Header } from "./components/header/Header";
import { HashRouter } from "react-router-dom";
import { ConfigProvider } from "antd";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#6485c1",
        },
      }}
    >
      <div className="App">
        <HashRouter>
          <Header />
          <AppRouter />
        </HashRouter>
      </div>
    </ConfigProvider>
  );
}

export default App;
