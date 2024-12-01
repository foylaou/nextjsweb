"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"

const navigation = [
  { name: "首頁", href: "/home" },
  { name: "關於", href: "/about" },
  {
    name: "產品",
    href: "/products",
    children: [
      { name: "全部產品", href: "/products" },
      { name: "最新商品", href: "/products/new" },
      { name: "熱門商品", href: "/products/hot" },
    ],
  },
  { name: "聯絡我們", href: "/contact" },
  { name: "登入", href: "/login" },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState("")

  return (
    <nav className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center space-x-2"
            >
              <span className="bg-blue-600 text-white px-3 py-2 rounded-md text-xl font-bold">
                LOGO
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative group"
              >
                <div className="flex items-center">
                  {item.children ? (
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === item.name ? "" : item.name)}
                      className="flex items-center text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                    >
                      {item.name}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className="flex items-center text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>

                {/* Dropdown Menu */}
                {item.children && (
                  <div
                    className={`absolute left-0 mt-2 w-48 rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-200 ${
                      activeDropdown === item.name ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown("")}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setActiveDropdown("")}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="text-gray-600 hover:text-blue-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.children ? (
                  <div>
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === item.name ? "" : item.name)}
                      className="w-full text-left rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                    >
                      {item.name}
                    </button>
                    {activeDropdown === item.name && (
                      <div className="ml-4 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="block rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                            onClick={() => {
                              setMobileMenuOpen(false)
                              setActiveDropdown("")
                            }}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}