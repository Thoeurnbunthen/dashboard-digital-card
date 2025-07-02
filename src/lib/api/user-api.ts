import type { IUserResponse } from "@/types/user-type";
import request from "./request";

type UserQueryParams = {
  page: number;
  pageSize: number;
  sortBy: string;
  sortOrder: string;
  email: object;
};

export const requestUser = () => {
  const USERS = async ({
    page,
    pageSize,
    sortBy,
    sortOrder,
    email,
  }: UserQueryParams): Promise<IUserResponse> => {
    const url = `/user?page=${page}&limit=${pageSize}&sortBy=${sortBy}&sortOrder=${sortOrder}&email=${email}&is_deleted=false`;
    return await request({
      url,
      method: "GET",
    });
  };

  const UPDATE_USER = async (id: string, status: boolean) => {
    return await request({
      url: `/user/update-user/${id}`,
      method: "PUT",
      data: {
        is_active: status,
      },
    });
  };

  return {
    USERS,
    UPDATE_USER,
  };
};
