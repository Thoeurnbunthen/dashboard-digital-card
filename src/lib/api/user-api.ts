import type { IUserResponse, IUser } from "@/types/user-type";
import request from "./request";
import { create } from "zustand";

interface UserEditDialogState {
  isOpen: boolean;
  userData: any;
  open: (user: any) => void;
  close: () => void;
}

export const useUserEditDialog = create<UserEditDialogState>((set) => ({
  isOpen: false,
  userData: null,
  open: (user) => set({ isOpen: true, userData: user }),
  close: () => set({ isOpen: false, userData: null }),
  
}));

type UserQueryParams = {
  page: number;
  pageSize: number;
  sortBy: string;
  sortOrder: string;
  email: string; 
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

  const UPDATE_USER = async (id: string, payload: Partial<IUser>) => {
    return await request({
      url: `/user/update-user/${id}`,
      method: "PUT",
      data: payload,
    });
  };

  const DELETE_USER = async (id: string) => {
    return await request({
      url: `/user/delete-user/${id}`,
      method: "DELETE",
    });
  };

  return {
    USERS,
    UPDATE_USER,
    DELETE_USER, 
  };

};
