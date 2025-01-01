"use client";
import { StoreProvider } from "easy-peasy";
import Store from "./store";

const StoreProviderComponent = ({ children }) => {
  return <StoreProvider store={Store}>{children}</StoreProvider>;
};

export default StoreProviderComponent;
