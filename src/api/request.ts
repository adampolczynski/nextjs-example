const API_ROUTE =
  "http://127.0.0.1:5001/fir-testing-template/us-central1/default-api";

export const request = async (
  endpoint: string,
  opts?: RequestInit,
  authToken?: string
) => {
  const res = await fetch(`${API_ROUTE}${endpoint}`, {
    ...opts,
    // credentials: 'include',
    headers: {
      authorization: `Bearer ${authToken}`,
      ...opts?.headers,
      // cookie: `token=${authToken};path=/;expires=Session;SameSite=Strict`,
    },
  });

  if (!res.ok) {
    const msg = `API request err (status ${res.status}): ${res.statusText}`;
    console.debug(msg);
    // throw new Error(
    //   msg
    // );
  }

  let body;

  const contentType = res.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    body = await res.json();
  } else {
    body = await res.text();
  }

  const { status, statusText } = res;

  return {
    body,
    status,
    statusText,
  };
};
