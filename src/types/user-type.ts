// // types/user.ts
// export interface Device {
//   id: string;
//   device_name: string;
//   device_type: string;
//   ip_address: string;
//   browser: string;
//   os: string;
//   logged_in_at: string;
// }

// export interface IMeta {
//   total: number;
//   page: number;
//   limit: number;
// }

// export interface IUser {
//   id: string;
//   full_name: string;
//   user_name: string;
//   email: string;
//   roles: string[];
//   created_at: string;
//   avatar: string | null;
//   devices: Device[];
//   meta: IMeta;
// }

export interface IUser {
  id: string;
  full_name: string;
  user_name: string;
  email: string;
  password: string;
  is_active: boolean;
  avatar: string | null;
  is_deleted: boolean;
  roles: string[];
  created_at: string;
  updated_at: string;
  devices: IDevice[];
}

export interface IDevice {
  id: string;
  device_name: string;
  device_type: string;
  ip_address: string;
  browser: string;
  os: string;
  is_deleted: boolean;
  logged_in_at: string;
  created_at: string;
}

export interface IUserResponse {
  data: IUser[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}
