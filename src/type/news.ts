// types/news.ts

// 新聞來源類型
export interface NewsSource {
  id: string | null;
  name: string;
}

// 文章類型
export interface Article {
  source: NewsSource;
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

// API 響應類型
export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

// 組件 Props 類型
export interface NewsCardProps {
  article: Article;
  index: number;
}
