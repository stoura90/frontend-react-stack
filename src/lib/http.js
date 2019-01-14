// @flow

const DEFAULT_FETCH_OPTIONS = {
  credentials: "same-origin",
  headers: {
    "content-type": "application/json",
  },
};

const errorHandler = response => {
  if (!response.ok) {
    // eslint-disable-next-line fp/no-throw
    throw new Error(response.statusText);
  }

  return response;
};

const get = (url: string, options: ?Object) =>
  fetch(url, {
    ...DEFAULT_FETCH_OPTIONS,
    ...options,
  })
    .then(errorHandler)
    .then(response => response.json());

const post = (url: string, options: ?Object) =>
  fetch(url, {
    method: "POST",
    ...DEFAULT_FETCH_OPTIONS,
    ...options,
  })
    .then(errorHandler)
    .then(response => response.json());

const http = {
  get,
  post,
};

export default http;
