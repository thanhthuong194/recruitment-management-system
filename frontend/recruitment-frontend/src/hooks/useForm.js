/**
 * @fileoverview Custom hook quản lý state và logic của form
 * @module hooks/useForm
 */

import { useState } from 'react';

/**
 * Custom hook để quản lý form state
 * 
 * @description Hook này cung cấp các chức năng:
 * - Quản lý giá trị của các field trong form
 * - Quản lý và hiển thị lỗi validation
 * - Reset form về giá trị ban đầu
 * 
 * @param {Object} [initialValues={}] - Giá trị khởi tạo cho các field trong form
 * 
 * @returns {Object} Object chứa các giá trị và hàm xử lý:
 * @returns {Object} returns.values - Giá trị hiện tại của các field
 * @returns {Object} returns.errors - Object chứa các lỗi validation theo field name
 * @returns {Function} returns.handleChange - Hàm xử lý thay đổi input
 * @returns {Function} returns.resetForm - Hàm reset form về giá trị ban đầu
 * @returns {Function} returns.setFormErrors - Hàm để set lỗi validation thủ công
 * 
 * @example
 * const { values, errors, handleChange, resetForm } = useForm({
 *   email: '',
 *   password: ''
 * });
 * 
 * <input name="email" value={values.email} onChange={handleChange} />
 * {errors.email && <span>{errors.email}</span>}
 */
export default function useForm(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  /**
   * Xử lý thay đổi giá trị của input field
   * @param {Event} e - Event từ input element
   * @description Cập nhật values state với giá trị mới từ input
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Reset form về giá trị ban đầu
   * @description Đưa values và errors về state ban đầu
   */
  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  /**
   * Set lỗi validation cho form
   * @param {Object} newErrors - Object chứa các lỗi theo field name
   * @example setFormErrors({ email: 'Email không hợp lệ', password: 'Mật khẩu quá ngắn' })
   */
  const setFormErrors = (newErrors) => {
    setErrors(newErrors);
  };

  return { values, errors, handleChange, resetForm, setFormErrors };
}
