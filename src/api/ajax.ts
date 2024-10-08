import axios, { AxiosHeaders } from "axios";

const getHeaders = (auth: boolean) => {
  const headers = new AxiosHeaders();
  if (auth) {
    const token = localStorage.getItem("token");
    return {
      ...headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return headers;
};

let controller: AbortController | null = null;

const createController = () => {
  if (controller) {
    controller.abort();
  }
  controller = new AbortController();
  return controller.signal;
};

const axiosInstance = axios.create({
  baseURL: "https://cgkvd8cp-5100.inc1.devtunnels.ms/api",
  //   baseURL: "https://localhost:3000/",
});

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
        return Promise.reject({ isCanceled: true, ...error });
      }

      const { status } = error.response;
      if (status === 401 || status === 403) {
        // Handle 401 & 403 errors (e.g., redirect to login)
        console.error("Unauthorized, logging out...");
        // Perform logout operation here, like clearing local storage and redirecting to login
        localStorage.removeItem("token"); // Clear the token
        window.location.href = "/auth/login"; // Redirect to login page
      }
    }
    return Promise.reject(error);
  }
);

const postAjax = async (url: string, data: any, auth: boolean) => {
  return await axiosInstance.post(url, data, {
    headers: getHeaders(auth),
    signal: createController(),
  });
};

const putAjax = (url: string, data: any, auth: boolean) => {
  return axiosInstance.put(url, data, {
    headers: getHeaders(auth),
    signal: createController(),
  });
};

const deleteAjax = (url: string, auth: boolean) => {
  return axiosInstance.delete(url, {
    headers: getHeaders(auth),
    signal: createController(),
  });
};

const getAjax = (url: string, auth: boolean) => {
  return axiosInstance.get(url, {
    headers: getHeaders(auth),
    signal: createController(),
  });
};

export const AjaxUtils = {
  getAjax,
  deleteAjax,
  putAjax,
  postAjax,
};
