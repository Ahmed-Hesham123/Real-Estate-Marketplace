import { Outlet } from "react-router-dom";
import { Header } from "../components/index";

const Root = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Root;
