'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

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
  const { isAuthenticated, userEmail, logout } = useAuth();

  // 因為目前 AuthContext 中沒有 userAuthorities，我們先模擬一個假的權限檢查
  // 實際應用中，你需要從後端 API 獲取這些權限信息
  const mockAuthorities = {
    Sys: 'admin',
    Audit: 'admin',
    KPI: 'admin',
    Org: 'admin'
  };

  // Helper function to check authority
  const hasAuthority = (requiredAuthority: keyof typeof mockAuthorities) => {
    return mockAuthorities[requiredAuthority]?.toUpperCase() !== 'NONE';
  };

  const navigationItems: NavItem[] = [
    { name: "首頁", href: "/home" },
    ...(isAuthenticated ? [
      {
        name: "功能模組",
        href: "#",
        children: [
          ...(hasAuthority('Audit') ? [{
            name: "石化督導",
            href: "#",
            children: [
              {
                name: "石化督導資料設定",
                href: "#",
                children: [
                  { name: "督導資料建立", href: "/audit/create-audit" },
                  { name: "督導廠資料管理", href: "/audit/query-factory" }
                ]
              },
              { name: "石化督導資料綜合查詢", href: "/audit" },
              {
                name: "報表",
                href: "#",
                children: [
                  { name: "石化督導改善建議分類統計圖", href: "/audit/report" },
                  { name: "事業單位改善完成率一覽表", href: "/audit/report-improve-status" },
                  { name: "各類建議改善完成率一覽表", href: "/audit/report-summary" },
                  { name: "災害事件一覽表", href: "/audit/report-incident" }
                ]
              }
            ]
          }] : []),
          ...(hasAuthority('KPI') ? [{
            name: "績效指標",
            href: "#",
            children: [
              {
                name: "檢視/編輯KPI",
                href: "#",
                children: [
                  { name: "製程安全管理", href: "/kpi/psm" },
                  { name: "環保管理", href: "/kpi/ep" },
                  { name: "能源管理", href: "/kpi/eco" }
                ]
              },
              {
                name: "改善成果",
                href: "#",
                children: [
                  { name: "資料上傳", href: "/kpi/improvement-result-upload" },
                  { name: "資料庫查詢", href: "/kpi/improvement-result-db" },
                  { name: "Excel固定格式匯入", href: "/kpi/improvement-result-import" }
                ]
              },
              { name: "改善計畫", href: "/kpi/improvement-plan" }
            ]
          }] : [])
        ]
      }
    ] : []),
    {
      name: "說明",
      href: "#",
      children: [
        { name: "操作說明", href: "/help" }
      ]
    },
    ...(isAuthenticated ? [{
      name: userEmail || "用戶",
      href: "#",
      children: [
        { name: "個人資料", href: "/profile" },
        {
          name: "登出",
          href: "#",
          onClick: () => {
            logout();
            setMobileMenuOpen(false);
          }
        }
      ]
    }] : [
      { name: "登入", href: "/login" }
    ])
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
