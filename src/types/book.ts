export interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  price: number;
  coverImage: string;
  description: string;
  publicationDate: string;
  ISBN: string;
  language: string;
  pages: number;
  publisher: string;
}

export interface CartItem extends Book {
  quantity: number;
}
