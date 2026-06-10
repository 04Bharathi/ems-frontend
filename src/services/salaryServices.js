import axios from "axios";

const API = axios.create({
  baseURL: "https://ems-api-alpha.vercel.app/api/salary",
});

export const addSalary = async (data, token) => {
  const response = await API.post("/add", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const getSalaryById = async (id, token) => {
  const response = await API.get(`/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response);

  return response;
};
