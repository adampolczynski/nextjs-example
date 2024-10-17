import { cookies } from "next/headers";
import { NavbarClient } from "./navbar-client";

export const Navbar = ({ user }: { user?: any }) => {
  const authToken = cookies().get("token")?.value;
  console.log("server navbar re-render: ", authToken);
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" style={{ paddingLeft: "2rem" }}>
          An example
          <span
            style={{
              fontSize: 10,
              fontWeight: 500,
              marginLeft: "0.3rem",
            }}
          >
            using Next.js
          </span>
          <p style={{ fontSize: 10 }}>by Adam Polczynski</p>
        </a>
        <span>{authToken ? `Hey ${user?.email}` : `Hey guest`}</span>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            width: "30rem",
          }}
        >
          <NavbarClient authToken={authToken} />
        </div>
      </div>
    </nav>
  );
};
