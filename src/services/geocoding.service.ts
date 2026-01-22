// Service để chuyển đổi tọa độ (lat/lng) thành địa chỉ (reverse geocoding)
// Sử dụng OpenStreetMap Nominatim API (miễn phí, không cần API key)

interface GeocodingResult {
  address: string;
  district?: string; // Quận/Huyện
  ward?: string; // Phường/Xã
  city?: string; // Tỉnh/Thành phố
  state?: string;
  country?: string;
  fullAddress: string;
}

class GeocodingService {
  private baseURL = 'https://nominatim.openstreetmap.org/reverse';

  async reverseGeocode(latitude: number, longitude: number): Promise<GeocodingResult | null> {
    try {
      const url = `${this.baseURL}?lat=${latitude}&lon=${longitude}&format=json&accept-language=vi`;
      
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'SchoolManagementSystem/1.0', // Nominatim yêu cầu User-Agent
        },
      });

      if (!response.ok) {
        throw new Error('Không thể lấy địa chỉ từ tọa độ');
      }

      const data = await response.json();

      if (!data || !data.address) {
        return null;
      }

      const address = data.address;
      const fullAddress = data.display_name || '';

      // Lấy quận/huyện từ các field có thể có trong Nominatim response
      // Ở Việt Nam, Nominatim thường trả về: district, city_district, suburb
      const district = 
        address.district ||           // Quận/Huyện (phổ biến nhất)
        address.city_district ||      // Quận trong thành phố
        address.suburb ||             // Khu vực ngoại thành
        address.municipality ||       // Thị xã/Thị trấn
        address.county ||             // Huyện
        '';

      // Lấy phường/xã
      const ward = 
        address.ward ||               // Phường/Xã (phổ biến nhất)
        address.neighbourhood ||      // Khu phố
        address.city_block ||         // Tổ dân phố
        address.suburb ||             // Phường (nếu không có ward)
        '';

      // Lấy tỉnh/thành phố
      const city = 
        address.city ||               // Thành phố
        address.town ||               // Thị xã
        address.state ||              // Tỉnh (nếu không có city)
        address.region ||             // Vùng
        '';

      return {
        address: address.road || address.house_number || address.house || '',
        district,
        ward,
        city,
        state: address.state || address.region || '',
        country: address.country || 'Việt Nam',
        fullAddress,
      };
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      return null;
    }
  }

  // Format địa chỉ ngắn gọn để hiển thị (bao gồm quận/huyện)
  formatShortAddress(result: GeocodingResult | null): string {
    if (!result) return '';

    const parts: string[] = [];
    
    // Thêm phường/xã nếu có (tùy chọn, có thể bỏ qua để ngắn gọn hơn)
    // if (result.ward) parts.push(result.ward);
    
    // Thêm quận/huyện (quan trọng - luôn hiển thị nếu có)
    if (result.district) {
      parts.push(result.district);
    }
    
    // Thêm tỉnh/thành phố (quan trọng - luôn hiển thị nếu có)
    if (result.city) {
      parts.push(result.city);
    } else if (result.state) {
      // Nếu không có city thì dùng state
      parts.push(result.state);
    }

    // Nếu không có gì thì dùng fullAddress
    return parts.length > 0 ? parts.join(', ') : result.fullAddress;
  }
}

export const geocodingService = new GeocodingService();
