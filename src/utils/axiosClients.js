import axios from "axios";

const axiosClient = axios.create({

  baseURL:
    "https://niyati-matrimony-api-dqefdkdch6ebghcs.indiasouthcentral-01.azurewebsites.net/api",

  headers: {
    "Content-Type": "application/json",
  },

});


// ========================================
// REQUEST INTERCEPTOR
// ========================================

axiosClient.interceptors.request.use(

  (config) => {

    const token =
      localStorage.getItem("token");

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;

    }

    return config;

  },

  (error) => {

    return Promise.reject(error);

  }

);


// ========================================
// RESPONSE INTERCEPTOR
// ========================================

axiosClient.interceptors.response.use(

  (response) => {

    return response;

  },

  (error) => {

    if (
      error.response?.status === 401 &&
      !error.config?.url?.includes("/auth/login")
    ) {

      console.log(
        "JWT expired or invalid"
      );

      localStorage.removeItem("token");
      localStorage.removeItem("memberID");
      localStorage.removeItem("userName");
      localStorage.removeItem("tokenExpiry");
      localStorage.removeItem("profileCompleted");
      localStorage.removeItem("loggedInUser");

      window.location.href = "/login";

    }

    return Promise.reject(error);

  }

);

export default axiosClient;