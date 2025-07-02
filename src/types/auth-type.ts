export interface IAuthResponse {
  data: {
    accessToken: string;
    refreshToken: string;
    existUser: {
      roles: string[];
    };
  };
}

export type AuthLoginForm = {
  email?: string;
  username?: string;
  password: string;
};
