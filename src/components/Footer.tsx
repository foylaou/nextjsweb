export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">聯絡資訊</h3>
            <p>電話：(02) 1234-5678</p>
            <p>信箱：contact@example.com</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">快速連結</h3>
            <ul>
              <li><a href="/about" className="hover:text-gray-300">關於我們</a></li>
              <li><a href="/privacy" className="hover:text-gray-300">隱私政策</a></li>
              <li><a href="/terms" className="hover:text-gray-300">使用條款</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">追蹤我們</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-300">Facebook</a>
              <a href="#" className="hover:text-gray-300">Twitter</a>
              <a href="#" className="hover:text-gray-300">Instagram</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}