import { LoginCredentials, LoginResponse } from "@/interfaces/login/auth";
import { API_URL } from "./URL";

export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    return response.json();
  }
