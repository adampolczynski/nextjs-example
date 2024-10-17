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

  let body;
  try {
    body = res.json();
  } catch (e) {
    console.debug(e);
    body = res.body;
  }
  const { status, statusText } = res;

  return {
    body,
    status,
    statusText,
  };
};
