type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

type InfiniteUsers = {
  page: number;
  total_pages: number;
  total: number;
  per_page: number;
  data: User[];
  support: {
    text: string;
    url: string;
  };
};

type Member = {
  name: string;
  job: string;
};
