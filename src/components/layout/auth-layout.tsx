import { Outlet } from "react-router";

const AuthLayout: React.FC = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
