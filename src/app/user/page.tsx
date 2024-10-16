import { request } from "@/api/request";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async () => {
  const authToken = cookies().get("token")?.value;
  const user = await (await request("/profile", undefined, authToken)).json();
  // const user = await (await fetch('http://backend:4000/user')).json()

  if (!user) {
    redirect("/");
  }

  return (
    <div>
      <h2>Your profile info</h2>
      <hr />
      <p>ID: {user._id}</p>
      <p>Email: {user.email}</p>
      <p>Password: {user.password}</p>
    </div>
  );
};
