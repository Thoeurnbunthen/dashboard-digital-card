import request from "@/lib/api/request";

export const requestProfile = () => {
  const PROFILE = async () => {
    return await request({
      url: "/user/me",
    });
  };
  return {
    PROFILE,
  };
};
