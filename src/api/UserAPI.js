import Base from './BaseApi';
import { saveUserId, saveUserProfileInfo } from '../utils/AsyncStorageHelper';

export default class UserAPI extends Base {
  loginUser(intl, data) {
    return this.apiClient.post(intl, '/user/login', data);
  }
}
