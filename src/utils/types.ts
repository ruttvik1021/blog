export interface ILogin {
  email: string;
  password: string;
}

export interface ICategory {
  categoryName: string;
}

export interface IBlog {
  description: string;
  title: string;
  content: string;
  image: string;
  isFeatured: boolean;
  categoryId: number;
}
