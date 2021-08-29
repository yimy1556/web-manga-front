import authAxios from 'src/modules/shared/axios/authAxios';
import { AuthToken } from 'src/modules/auth/authToken';

export default class AuthService {

  static async signinWithEmailAndPassword(email, password) {  
    const response = await authAxios.post('/auth/sign-in', {
      email,
      password,
    });
    
    return response.data;
  };

  static async fetchMe() {
    const response = await authAxios.get('/auth/me');
    
    return response.data;
  };

  static signout() {
    AuthToken.set(null, true);
  };

  static async updateProfile(data) {
    const body = {
      data,
    };
    
    const response = await authAxios.put(
      '/auth/profile',
      body,
    );
    
    return response.data;
  };
  
}
