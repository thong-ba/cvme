// Custom hook để lấy vị trí người dùng
import { useState, useEffect, useCallback } from 'react';

interface Position {
  latitude: number;
  longitude: number;
}

interface GeolocationState {
  position: Position | null;
  error: string | null;
  loading: boolean;
  permissionGranted: boolean | null;
}

export const useGeolocation = () => {
  const [state, setState] = useState<GeolocationState>({
    position: null,
    error: null,
    loading: true,
    permissionGranted: null,
  });

  const getCurrentPosition = useCallback(() => {
    // Kiểm tra xem browser có hỗ trợ Geolocation API không
    if (!navigator.geolocation) {
      setState({
        position: null,
        error: 'Trình duyệt của bạn không hỗ trợ Geolocation API',
        loading: false,
        permissionGranted: false,
      });
      return;
    }

    setState((prev) => ({ ...prev, loading: true, error: null }));

    // Lấy vị trí hiện tại
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          position: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          error: null,
          loading: false,
          permissionGranted: true,
        });
      },
      (error) => {
        let errorMessage = 'Không thể lấy vị trí';
        let permissionGranted: boolean | null = false;

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Người dùng đã từ chối quyền truy cập vị trí';
            permissionGranted = false;
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Thông tin vị trí không khả dụng';
            permissionGranted = null;
            break;
          case error.TIMEOUT:
            errorMessage = 'Yêu cầu lấy vị trí đã hết thời gian chờ';
            permissionGranted = null;
            break;
          default:
            errorMessage = 'Đã xảy ra lỗi không xác định';
            permissionGranted = null;
            break;
        }

        setState({
          position: null,
          error: errorMessage,
          loading: false,
          permissionGranted,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  useEffect(() => {
    getCurrentPosition();
  }, [getCurrentPosition]);

  return { ...state, retry: getCurrentPosition };
};
