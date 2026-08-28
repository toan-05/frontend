// Khớp BE: com.example.demo.dto.response.ApiResponse<T> (record)
export interface ApiResponse<T> {
  status: number;
  errorCode: string | null;
  message: string;
  data: T;
  timestamp: string;
}
