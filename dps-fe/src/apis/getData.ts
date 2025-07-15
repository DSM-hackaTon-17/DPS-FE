import axios from "axios";

interface allProps {
  id: number;
  deviceId: number;
  illu: number;
  temp: number;
  humi: number;
  oxid: number;
  createdDate: string;
}

const instance = axios.create({
  baseURL: "http://192.168.1.35:8080",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

export default instance;

export const getIllu = async (device_id: number = 1) => {
  try {
    const res = await instance.get<{ illu: number[] }>(
      `/illu/list/${device_id}`
    );
    return res.data;
  } catch (err) {
    console.error("getIllu error:", err);
  }
};

export const getTemp = async (device_id: number = 1) => {
  try {
    const res = await instance.get<{ temp: number[] }>(
      `/temp/list/${device_id}`
    );
    return res.data;
  } catch (err) {
    console.error("getTemp error:", err);
  }
};

export const getHumi = async (device_id: number = 1) => {
  try {
    const res = await instance.get<{ humi: number[] }>(
      `/humi/list/${device_id}`
    );
    return res.data;
  } catch (err) {
    console.error("getHumi error:", err);
  }
};

export const getOxid = async (device_id: number = 1) => {
  try {
    const res = await instance.get<{ oxid: number[] }>(
      `/oxid/list/${device_id}`
    );
    return res.data;
  } catch (err) {
    console.error("getOxid error:", err);
  }
};

export const getAll = async (device_id: number = 1) => {
  try {
    const res = await instance.get<allProps[]>(`/all/list/${device_id}`);
    return res.data;
  } catch (err) {
    console.error("getAll error:", err);
  }
};
