export interface RegisterData {
    email: string;
    password: string;
  }
  
  export interface LoginData {
    email: string;
  }
  
  export interface User {
    _id: string;
    email: string;
  }
  
  export interface AuthResponse {
    AxiosError?: any;
    success: boolean;
    message: string;
    token?: string;
    data?: User;
  }
  