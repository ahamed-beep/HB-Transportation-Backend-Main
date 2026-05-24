export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}

export interface RequestUser {
  userId: string;
  email: string;
  name: string;
  role: string;
}