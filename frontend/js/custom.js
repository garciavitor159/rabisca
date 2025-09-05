// Instância personalizada do Axios
export const axiosPersonalizado = axios.create({
  baseURL: "php/",
  headers: {
    Accept: "application/json; charset=utf-8",
    "Content-Type": "application/json; charset=utf-8",
  },
});
