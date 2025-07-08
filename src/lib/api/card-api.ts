import type { ICardResponse } from "@/types/card-types";
import request from "./request";

export type CardQueryParams = {
  page: number;
  pageSize: number;
  sortBy: string;
  sortOrder: "ASC" | "DESC";
  is_deleted?: boolean;
  title?: string;
  email?: string;
};

export const requestCard = () => {
  const GET_CARDS = async ({
    page,
    pageSize,
    sortBy,
    sortOrder,
    is_deleted = false,
    title,
    email,
  }: CardQueryParams): Promise<ICardResponse> => {
    let url = `/card/get-cards-by-admin?page=${page}&limit=${pageSize}&sortBy=${sortBy}&sortOrder=${sortOrder}&is_deleted=${is_deleted}`;

    if (title) {
      url += `&title=${encodeURIComponent(title)}`;
    }

    if (email) {
      url += `&email=${encodeURIComponent(email)}`;
    }

    try {
      const response: { cards: ICardResponse } = await request({
        url,
        method: "GET",
      });
      return response.cards;
    } catch (error) {
      console.error("Failed to fetch cards:", error);
      throw error;
    }
  };

  const UPDATE_CARD = async (id: string, status: boolean) => {
    return await request({
      url: `/card/update-card/${id}`,
      method: "PUT",
      data: { is_active: status },
    });
  };

  const DELETE_CARD = async (id: string) => {
    return await request({
      url: `/api/v1/card/delete-card-by-admin/${id}`,
      method: "DELETE",
    });
  };

  return { GET_CARDS, UPDATE_CARD, DELETE_CARD };
};
