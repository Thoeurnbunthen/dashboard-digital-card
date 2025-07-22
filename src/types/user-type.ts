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

export interface IUserResponse {
  data: IUser[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}
