import { CurrentUserModel } from "./current-user.model";

export interface LoginResponseModel {
  accessToken: string;
  refreshToken?: string;
  user: CurrentUserModel;
}