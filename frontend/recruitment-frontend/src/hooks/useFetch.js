/**
 * @fileoverview Custom hook để fetch dữ liệu từ API
 * @module hooks/useFetch
 */

import { useState, useEffect } from 'react';

/**
 * Custom hook để thực hiện HTTP requests
 * 
 * @description Hook này cung cấp các chức năng:
 * - Tự động fetch dữ liệu khi URL thay đổi
 * - Quản lý trạng thái loading, error, và data
 * - Cung cấp hàm refetch để gọi lại API
 * 
 * @param {string} url - URL của API endpoint cần fetch
 * @param {Object} [options={}] - Options cho fetch request (method, headers, body, etc.)
 * 
 * @returns {Object} Object chứa các giá trị:
 * @returns {*} returns.data - Dữ liệu trả về từ API (null nếu chưa fetch hoặc lỗi)
 * @returns {boolean} returns.loading - Trạng thái đang tải dữ liệu
 * @returns {string|null} returns.error - Thông báo lỗi (nếu có)
 * @returns {Function} returns.refetch - Hàm để gọi lại API
 * 
 * @example
 * // Fetch danh sách users
 * const { data, loading, error, refetch } = useFetch('/api/users');
 * 
 * // Fetch với options
 * const { data } = useFetch('/api/posts', { 
 *   method: 'GET',
 *   headers: { 'Authorization': 'Bearer token' }
 * });
 */
export default function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Thực hiện fetch dữ liệu từ API
   * @async
   * @description Gọi API, xử lý response và cập nhật state tương ứng
   */
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error('Fetch failed');
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]); // gọi lại khi url thay đổi

  return { data, loading, error, refetch: fetchData };
}
