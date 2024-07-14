export interface ILogin {
  email: string;
  password: string;
}

export interface ICreateCategory {
  categoryName: string;
}

export interface IBlog {
  description: string;
  title: string;
  content: string;
  image: string;
  isFeatured: boolean;
  categoryId: string;
  createdOn: string; // Consider using Date if you will work with Date objects
  createdBy: string | null; // If 'createdBy' can be a string or null
  modifiedOn: string; // Same as createdOn, use Date if working with Date objects
  modifiedBy: string | null; // Same as 'createdBy'
}

export interface ICategory {
  id: string;
  categoryName: string;
  createdOn: string; // Consider using Date if you will work with Date objects
  createdBy: string | null; // If 'createdBy' can be a string or null
  modifiedOn: string; // Same as createdOn, use Date if working with Date objects
  modifiedBy: string | null; // Same as 'createdBy'
}
