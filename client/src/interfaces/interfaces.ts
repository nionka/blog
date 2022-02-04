export interface IErrors {
  email?: string;
  password?: string;
  licence?: string;
  name?: string;
};

export interface IArticle {
  id: string,
  date: string,
  author: string,
  title: string,
  tags: string,
  description: string,
  content: string,
  url: string
}