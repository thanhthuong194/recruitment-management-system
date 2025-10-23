// File: src/hooks/useScrollDirection.js (Phiên bản Cuối cùng)

import { useState, useEffect } from 'react';

// Dùng hàm này để lấy giá trị cuộn đáng tin cậy nhất
const getScrollY = () => {
    // Trả về giá trị cuộn Y từ html, body, hoặc window (tùy thuộc vào trình duyệt/cấu hình)
    return window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
};

const useScrollDirection = (threshold = 80) => {
    const [scrollDir, setScrollDir] = useState("up"); 
    const [isHidden, setIsHidden] = useState(false); 

    useEffect(() => {
        let lastScrollY = getScrollY(); // Lấy giá trị cuộn ban đầu

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