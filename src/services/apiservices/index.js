// authApi.js
import { CrudBaseService } from "../http/crudServices";

export class AuthApi extends CrudBaseService {
  constructor(pathUrl) {
    super(process.env.NEXT_PUBLIC_API_BASE_URL, pathUrl);
  }
}

export const baseUrl = '/api/auth'  
export const userLogin = new AuthApi(`${baseUrl}/login`);
export const refreshToken = new AuthApi(`${baseUrl}/refresh`);
