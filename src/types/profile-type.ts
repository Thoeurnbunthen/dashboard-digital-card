export interface Root {
  message: string;
  data: IProfileResponse;
}

export interface IProfileResponse {
  id: string;
  full_name: string;
  user_name: string;
  email: string;
  password: string;
  avatar: string;
  is_deleted: boolean;
  roles: string[];
  created_at: string;
  updated_at: string;
}
