export interface IUserRegister {
  email: string,
  password: string,
  name: string,
  gender: 'male' | 'female' | 'other',
  licence: boolean
}
