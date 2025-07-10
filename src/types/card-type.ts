export interface ICard {
  user: any;
  id: string;
  card_name: string;
  card_number: string;
  card_type: string;
  card_expiry_date: string;
  card_cvv: string;
  is_active: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface ICardResponse {
  data: ICard[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}