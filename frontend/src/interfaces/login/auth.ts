export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  data: {
    id: number;
    name: string;
    email: string;
  }
}