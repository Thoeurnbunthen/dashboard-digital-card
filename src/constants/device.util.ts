import type { DeviceInfo } from "@/types/device";
import { v4 as uuidv4 } from "uuid";
import { isBrowser } from "@/lib/browser.util";

export const getLocalDeviceInfo = (): DeviceInfo | null => {
  if (isBrowser) {
    const device = localStorage.getItem("device-info");
    return device ? JSON.parse(device) : null;
  }
  return null;
};

export const setLocalDeviceInfo = (params: DeviceInfo) => {
  if (isBrowser) {
    localStorage.setItem("device-info", JSON.stringify(params));
  }
};

function setDeviceId(e: string) {
  return localStorage.setItem("deviceId", e);
}
export function deviceId() {
  const deviceId =
    (typeof window !== "undefined" && localStorage.getItem("deviceId")) || "";
  if (deviceId) {
    return deviceId;
  }
  const newDeviceId = uuidv4();
  if (typeof localStorage !== "undefined") {
    setDeviceId(newDeviceId);
  }

  return newDeviceId;
}
