/**
 * @fileoverview Custom hook để theo dõi hướng scroll của trang
 * @module hooks/useScrollDirection
 * @description Phiên bản cuối cùng - tối ưu cho việc ẩn/hiện header khi scroll
 */

import { useState, useEffect } from 'react';

/**
 * Lấy giá trị vị trí scroll Y hiện tại
 * @function getScrollY
 * @returns {number} Vị trí scroll Y (pixels từ đầu trang)
 * @description Hàm này đảm bảo tương thích với nhiều trình duyệt khác nhau
 * bằng cách kiểm tra nhiều nguồn giá trị scroll
 */
const getScrollY = () => {
    // Trả về giá trị cuộn Y từ html, body, hoặc window (tùy thuộc vào trình duyệt/cấu hình)
    return window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
};

/**
 * Custom hook theo dõi hướng scroll và trạng thái ẩn/hiện của header
 * 
 * @description Hook này cung cấp:
 * - Theo dõi hướng scroll (lên/xuống)
 * - Logic ẩn header khi scroll xuống, hiện khi scroll lên
 * - Threshold để tránh ẩn/hiện khi scroll nhỏ
 * 
 * @param {number} [threshold=80] - Ngưỡng pixels để kích hoạt ẩn header (default: 80px)
 * 
 * @returns {Object} Object chứa:
 * @returns {string} returns.scrollDir - Hướng scroll hiện tại ("up" | "down")
 * @returns {boolean} returns.isHidden - Header có nên ẩn không (true = ẩn, false = hiện)
 * 
 * @example
 * // Sử dụng trong Header component
 * const { scrollDir, isHidden } = useScrollDirection(80);
 * 
 * return (
 *   <HeaderContainer $hidden={isHidden}>
 *     ...
 *   </HeaderContainer>
 * );
 */
const useScrollDirection = (threshold = 80) => {
    const [scrollDir, setScrollDir] = useState("up"); 
    const [isHidden, setIsHidden] = useState(false); 

    useEffect(() => {
        let lastScrollY = getScrollY(); // Lấy giá trị cuộn ban đầu

        /**
         * Cập nhật hướng scroll và trạng thái ẩn/hiện
         * @function updateScrollDir
         * @description Được gọi mỗi khi có sự kiện scroll
         * - So sánh vị trí scroll hiện tại với vị trí trước đó
         * - Cập nhật hướng scroll nếu thay đổi > 5px (tránh jitter)
         * - Ẩn header nếu scroll xuống và đã vượt threshold
         * - Hiện header nếu scroll lên hoặc ở đầu trang
         */
        const updateScrollDir = () => {
            const scrollY = getScrollY(); // Lấy giá trị cuộn hiện tại
            const direction = scrollY > lastScrollY ? "down" : "up";
            
            // Cập nhật hướng cuộn
            if (direction !== scrollDir && Math.abs(scrollY - lastScrollY) > 5) {
                setScrollDir(direction);
            }
            
            // LOGIC ẨN/HIỆN
            const shouldHide = direction === "down" && scrollY > threshold;
            const shouldShow = direction === "up" || scrollY <= threshold;
            
            if (shouldHide && !isHidden) {
                setIsHidden(true);
            } else if (shouldShow && isHidden) {
                 setIsHidden(false);
            }

            lastScrollY = scrollY > 0 ? scrollY : 0;
        };

        // Lắng nghe sự kiện trên window
        window.addEventListener("scroll", updateScrollDir); 
        
        return () => window.removeEventListener("scroll", updateScrollDir); 
        
    }, [scrollDir, isHidden, threshold]); 

    return { scrollDir, isHidden }; 
};

export default useScrollDirection;