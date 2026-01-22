// Custom hook để lấy và cập nhật thời gian Việt Nam
import { useState, useEffect } from 'react';

interface VietnamTime {
  dateTime: string; // Format: "dd/mm/yyyy, hh:mm:ss"
  date: string; // Format: "dd/mm/yyyy"
  time: string; // Format: "hh:mm:ss"
  dayOfWeek: string; // Format: "Thứ X"
}

export const useVietnamTime = (updateInterval: number = 1000) => {
  const [vietnamTime, setVietnamTime] = useState<VietnamTime>(() => {
    const now = new Date();
    const dateTime = now.toLocaleString('vi-VN', {
      timeZone: 'Asia/Ho_Chi_Minh',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    const date = now.toLocaleDateString('vi-VN', {
      timeZone: 'Asia/Ho_Chi_Minh',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    const time = now.toLocaleTimeString('vi-VN', {
      timeZone: 'Asia/Ho_Chi_Minh',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    const dayOfWeek = now.toLocaleDateString('vi-VN', {
      timeZone: 'Asia/Ho_Chi_Minh',
      weekday: 'long',
    });

    return { dateTime, date, time, dayOfWeek };
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const dateTime = now.toLocaleString('vi-VN', {
        timeZone: 'Asia/Ho_Chi_Minh',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      const date = now.toLocaleDateString('vi-VN', {
        timeZone: 'Asia/Ho_Chi_Minh',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
      const time = now.toLocaleTimeString('vi-VN', {
        timeZone: 'Asia/Ho_Chi_Minh',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      const dayOfWeek = now.toLocaleDateString('vi-VN', {
        timeZone: 'Asia/Ho_Chi_Minh',
        weekday: 'long',
      });

      setVietnamTime({ dateTime, date, time, dayOfWeek });
    };

    // Cập nhật ngay lập tức
    updateTime();

    // Cập nhật theo interval
    const interval = setInterval(updateTime, updateInterval);

    return () => clearInterval(interval);
  }, [updateInterval]);

  return vietnamTime;
};
