
// Đây là một service giả lập kết nối SQL Server

// Định nghĩa kiểu dữ liệu cho thông tin kết nối
export interface SqlServerConfig {
  server: string;
  database: string;
  user: string;
  password: string;
  options?: {
    encrypt?: boolean;
    trustServerCertificate?: boolean;
    connectionTimeout?: number;
  };
}

// Lưu cấu hình kết nối vào localStorage
export const saveConnectionConfig = (config: SqlServerConfig): void => {
  try {
    localStorage.setItem('sqlServerConfig', JSON.stringify(config));
    console.log('Đã lưu cấu hình kết nối SQL Server');
  } catch (error) {
    console.error('Lỗi khi lưu cấu hình kết nối SQL Server:', error);
  }
};

// Lấy cấu hình kết nối từ localStorage
export const getConnectionConfig = (): SqlServerConfig | null => {
  try {
    const config = localStorage.getItem('sqlServerConfig');
    return config ? JSON.parse(config) : null;
  } catch (error) {
    console.error('Lỗi khi lấy cấu hình kết nối SQL Server:', error);
    return null;
  }
};

// Xóa cấu hình kết nối
export const clearConnectionConfig = (): void => {
  localStorage.removeItem('sqlServerConfig');
  console.log('Đã xóa cấu hình kết nối SQL Server');
};

// Kiểm tra kết nối (giả lập)
export const testConnection = async (config: SqlServerConfig): Promise<boolean> => {
  console.log('Đang kiểm tra kết nối đến SQL Server:', config.server);
  
  // Giả lập kết nối
  return new Promise((resolve) => {
    setTimeout(() => {
      // Giả lập kết nối thành công (80% tỉ lệ thành công)
      const isSuccess = Math.random() < 0.8;
      console.log(isSuccess ? 'Kết nối thành công' : 'Kết nối thất bại');
      resolve(isSuccess);
    }, 1500);
  });
};

// Thực hiện một truy vấn (giả lập)
export const executeQuery = async (query: string): Promise<any[]> => {
  console.log('Đang thực hiện truy vấn:', query);
  
  // Giả lập kết quả truy vấn
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.9) {
        // Giả lập dữ liệu trả về
        const results = Array.from({ length: 5 }, (_, i) => ({
          id: i + 1,
          name: `Item ${i + 1}`,
          price: Math.floor(Math.random() * 1000) / 10,
          date: new Date().toISOString(),
        }));
        resolve(results);
      } else {
        reject(new Error('Lỗi khi thực hiện truy vấn'));
      }
    }, 800);
  });
};
