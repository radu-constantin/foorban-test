export interface UpdateInfoRequest {
  name: string;
}

export interface ValidateUserRequest {
  name: string;
  age: number;
  married: boolean;
  dob: Date;
}
