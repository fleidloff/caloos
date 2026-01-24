type FetcherOptions = RequestInit & {
  headers?: HeadersInit;
};

export async function fetcher(
  input: RequestInfo | URL,
  options: FetcherOptions = {},
  secret: string
) {
  const defaultHeaders = {
    "x-secret": secret,
  };

  return fetch(input, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });
}
