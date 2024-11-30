export default function Navbar() {
  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="text-xl font-bold">
              Logo
            </a>
            <div className="ml-10 flex items-center space-x-4">
              <a href="/" className="hover:text-gray-700">首頁</a>
              <a href="/about" className="hover:text-gray-700">關於</a>
              <a href="/products" className="hover:text-gray-700">產品</a>
              <a href="/contact" className="hover:text-gray-700">聯絡我們</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}