import { CookieName } from "@/types";
import Cookies from "js-cookie";

export const getAccessToken = () => Cookies.get(CookieName.ACCESS_TOKEN);
export const getRefreshToken = () => Cookies.get(CookieName.REFRESH_TOKEN);

export const saveTokens = (accessToken: string, refreshToken: string) => {
  Cookies.set(CookieName.ACCESS_TOKEN, accessToken);
  Cookies.set(CookieName.REFRESH_TOKEN, refreshToken);
};

export const clearTokens = () => {
  Cookies.remove(CookieName.ACCESS_TOKEN);
  Cookies.remove(CookieName.REFRESH_TOKEN);
};
