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

export interface IArticleForm {
  title: string,
  description: string,
  content: string,
  tags: string,
  image: string
}
