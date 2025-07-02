export interface IDashboardResponse {
  data: {
    summary: [
      {
        title: string;
        value: number;
        icon: string;
      }
    ];
    userGrowth: [
      {
        date: string;
        count: number;
      }
    ];
    recentUsers: [
      {
        id: string;
        email: string;
        full_name: string;
        created_at: Date;
        avatar: string;
        is_active: boolean;
      }
    ];
  };
}
