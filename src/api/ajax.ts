import axios, { AxiosHeaders } from "axios";

const getHeaders = (auth: boolean) => {
  const headers = new AxiosHeaders();
  const token = localStorage.getItem("token");
  if (auth) {
    return {
      ...headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return headers;
};

const axiosInstance = axios.create({
  baseURL: "https://1cfe-45-117-212-25.ngrok-free.app/",
  //   baseURL: "https://localhost:3000/",
});

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        // Handle 401 errors (e.g., redirect to login)
        console.error("Unauthorized, logging out...");
        // Perform logout operation here, like clearing local storage and redirecting to login
        localStorage.removeItem("token"); // Clear the token
        window.location.href = "/auth/login"; // Redirect to login page
      } else if (status === 403) {
        // Handle 403 errors (e.g., show a forbidden message)
        console.error("Forbidden, you do not have access.");
        alert("You do not have access to this resource.");
      }
    }
    return Promise.reject(error);
  }
);

const postAjax = async (url: string, data: any, auth: boolean) => {
  return await axiosInstance.post(url, data, {
    headers: getHeaders(auth),
  });
};

const putAjax = (url: string, data: any, auth: boolean) => {
  return axiosInstance.put(url, data, {
    headers: getHeaders(auth),
  });
};

const deleteAjax = (url: string, auth: boolean) => {
  return axiosInstance.delete(url, { headers: getHeaders(auth) });
};

const getAjax = (url: string, auth: boolean) => {
  return axiosInstance.get(url, { headers: getHeaders(auth) });
};

export const AjaxUtils = {
  getAjax,
  deleteAjax,
  putAjax,
  postAjax,
};
