export interface UserRegistrationRequest {
  username: string;
  email: string;
  password: string;
  fullName: string;
}

export interface UserRegistrationResponse {
  username: string;
  email: string;
  fullName: string;
}
