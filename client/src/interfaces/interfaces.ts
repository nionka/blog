export interface IErrors {
  email?: string;
  password?: string;
  licence?: string;
  name?: string;
  title?: string;
  description?: string;
  content?: string;
  image?: string;
};

export interface IArticle {
  _id: string,
  userId: string,
  title: string,
  tags: string,
  description: string,
  content: string,
  image: string,
  createdAt: string
}