import axios, { AxiosInstance } from "axios";
import Router from "vue-router";

/**
 * Custom HTTP Serivce for gettings pre-configured HTTP-Client
 */
class HttpService {
  get = (url: string) => {
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then(response => {
          resolve(response.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  };
}

const HTTP_SERVICE_INSTANCE = new HttpService();

export { HTTP_SERVICE_INSTANCE };
