'use client';



import CardComponent from "@/components/Card";
import {motion} from "motion/react";
import {AnimatePresence} from "framer-motion";

export default function CardList() {
  const cardData = {
    id: "1",
    title: "美食卡片",
    description: "這是一張美食卡片，展示了美味的料理。",
    image: "/file.svg", // 確保圖片位於 public/images 資料夾下
    imageInfo: "美食圖片",
  };

  return (
<AnimatePresence>
          <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
        >
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 p-4">
      <CardComponent data={cardData} />
    </div>
                    </motion.div>
  </AnimatePresence>
  );
}
