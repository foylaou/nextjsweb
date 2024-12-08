'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import Image from "next/image";
interface LoginResponse {
  token: string;
  email: string;
  expiration: string;
}

interface FormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsLoading(true);
  setError('');

  try {
    // 構建 query string
    const queryParams = new URLSearchParams({
      Email: formData.email,
      Password: formData.password,
    });

    const response = await fetch(`/api/proxy/login?${queryParams.toString()}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },

    });

    if (!response.ok) {
      const errorData = await response.json();
      setError(errorData.error || '認證錯誤，請重新嘗試');
      return;
    }
    console.log(response);
    const data = await response.json() as LoginResponse;

    if (data.token) {
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userEmail', data.email);
      localStorage.setItem('tokenExpiration', data.expiration);
      window.alert("sucessfully logged in");
      router.push('/home');
    } else {
      setError('認證錯誤，請重新嘗試');
    }
  } catch (error) {
    console.error('登入異常，異常說明:', error);
    setError('登入失敗，請檢查您的網路連線');
  } finally {
    setIsLoading(false);
  }
};
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <motion.div>
          <Image
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
              width={100} // 圖片寬度
              height={100} // 圖片高度
              priority={true} // 如果是關鍵圖片，設置優先加載
          />
        </motion.div>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {error && (
            <div className="mb-4 p-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
              {error}
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Enter your password"
              />
            </div>
          </div>

          <div>
            <motion.button
                whileHover={{ scale: 1.1}}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isLoading}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400"
            >
              {isLoading ? '登入中...' : '登入'}
            </motion.button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{' '}
          <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Start a 14 day free trial
          </a>
        </p>
      </div>
    </div>
  );
}
