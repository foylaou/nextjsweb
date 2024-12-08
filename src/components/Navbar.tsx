'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu, X, LogOut } from 'lucide-react';


// Types for navigation items
interface NavItem {
  name: string;
  href: string;
  children?: NavItem[];
  authority?: string;
  onClick?: () => void;
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  const navigationItems: NavItem[] = [
    { name: "首頁", href: "/home" },
    { name: "產品資訊", href: "/products",children:[
        {name:"最新產品",href: "/products/new"},
        {name:"熱門產品",href: "/products/hot"},

      ] },
    { name: "聯絡我們", href: "contact"},
    { name: "關於我們", href:"/about"},
    { name: "context", href: "/context" ,children:[
        {name : "edit" , href: "/context/edit"},
        {name : "list" , href: "/context/list"},
      ]},

  ];


  const DropdownMenuItem = ({ item }: { item: NavItem }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
      if (item.onClick) {
        e.preventDefault();
        item.onClick();
      }
      setMobileMenuOpen(false);
    };

    return (
      <div className="relative group">
        {item.children ? (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            {item.name}
            <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>
        ) : (
          <Link
            href={item.href}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={handleClick}
          >
            {item.name}
            {item.name === "登出" && <LogOut className="ml-2 h-4 w-4" />}
          </Link>
        )}

        {isOpen && item.children && (
          <div className="absolute left-full top-0 w-48 rounded-md bg-white shadow-lg">
            {item.children.map((child) => (
              <DropdownMenuItem key={child.name} item={child} />
            ))}
          </div>
        )}
      </div>
    );
  };

  const NavItem = ({ item }: { item: NavItem }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
      if (item.onClick) {
        e.preventDefault();
        item.onClick();
      }
    };

    return (
      <div className="relative">
        {item.children ? (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center px-3 py-2 text-gray-600 hover:text-blue-600"
          >
            {item.name}
            <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>
        ) : (
          <Link
            href={item.href}
            className="px-3 py-2 text-gray-600 hover:text-blue-600"
            onClick={handleClick}
          >
            {item.name}
          </Link>
        )}

        {isOpen && item.children && (
          <div className="absolute left-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            {item.children.map((child) => (
              <DropdownMenuItem key={child.name} item={child} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 justify-between items-center">
          <Link href="/" className="flex items-center">
            <span className="bg-blue-600 text-white px-3 py-2 rounded-md text-xl font-bold">

            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navigationItems.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
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

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigationItems.map((item) => (
              <div key={item.name} className="px-2">
                <DropdownMenuItem item={item} />
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
