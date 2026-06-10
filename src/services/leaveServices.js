import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/leave",
});

export const requestLeave = async (data) => {
  const response = await API.post("/request", data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response;
};

export const getLeavesById = async (id) => {
  const response = await API.get(`/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response;
};

export const getLeavesByLeaveId = async (id) => {
  const response = await API.get(`/id/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response;
};

export const getLeaves = async () => {
  const response = await API.get("/", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response;
};

export const changeLeaveStatus = async (id, status) => {
  const response = await API.put(
    `/${id}`,
    {
      status,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  );

  return response;
};

export const getLeaveHistory = async (id) => {
  const response = API.get(`/history/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  })
  return response
}
