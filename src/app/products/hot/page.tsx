'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Article, NewsCardProps } from '@/type/news';
import Image from "next/image";
import {AuthProvider} from "@/contexts/AuthContext";

async function fetchFoodNews(): Promise<Article[]> {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?language=zh&q=%E7%BE%8E%E9%A3%9F&apiKey=3216ae6135a4422c964caa9277410129`
    );

    if (!response.ok) throw new Error('Network response was not ok');

    const data = await response.json();
    return data.articles.filter((article: Article) =>
      article.urlToImage &&
      article.description &&
      article.title.length < 100
    ).slice(0, 6);
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

const NewsCard: React.FC<NewsCardProps> = ({ article, index }) => {
  const [isExpanded, setIsExpanded] = useState(false); // 控制放大視窗的狀態

  return (
    <AnimatePresence>
      {!isExpanded ? (
        <motion.div
          layoutId={`modal${index}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          onClick={() => setIsExpanded(true)} // 點擊圖片時設置放大
        >
          <div className="aspect-w-16 aspect-h-9">
            <Image
              src={article.urlToImage || '/placeholder-image.jpg'}
              alt={article.title}
              height={180}
              width={320}
              className="object-cover w-full h-48"
              loading="lazy"
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2 line-clamp-2">
              {article.title}
            </h3>
          </div>
        </motion.div>
      ) : (
        <motion.div
          layoutId={`modal${index}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setIsExpanded(false)} // 點擊背景時關閉放大
        >
          <motion.div
            className="bg-white rounded-lg shadow-lg overflow-hidden w-96 p-4"
            onClick={(e) => e.stopPropagation()} // 防止點擊內部關閉
          >
            <Image
              src={article.urlToImage || '/placeholder-image.jpg'}
              alt={article.title}
              height={300}
              width={400}
              className="object-cover w-full h-64"
              loading="lazy"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
              <p className="text-gray-600 mb-4">{article.description}</p>
              <span className="text-sm text-gray-500 block mb-2">
                發佈日期: {new Date(article.publishedAt).toLocaleDateString('zh-TW')}
              </span>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                閱讀更多
              </a>
              <button
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded w-full"
                onClick={() => setIsExpanded(false)} // 關閉視窗
              >
                關閉
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ErrorMessage: React.FC = () => (
  <div className="text-center py-10">
    <p className="text-gray-600">暫時無法載入美食新聞，請稍後再試。</p>
  </div>
);

export default function HotProductsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFoodNews().then(data => {
      setArticles(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!articles.length) return <ErrorMessage />;

  return (
       <AuthProvider>
    <div className="container mx-auto px-4 py-8">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-2xl font-bold mb-8 text-gray-800"
      >
        熱門美食新聞
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <NewsCard key={article.url} article={article} index={index} />
        ))}
      </div>
    </div>
         </AuthProvider>
  );
}
