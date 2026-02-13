export interface IUserBase {
  id: string;
  name: string;
  surname: string;
  nickname: string;
  role: string;
  birthday: string;
  email: string;
  height: number;
  sex: string;
}

export interface IDataUser {
  id: string;
  weight: number;
  waistline?: number | null;
  crew_neck?: number | null;
  chest?: number | null;
  arm?: number | null;
  thigh?: number | null;
  calf?: number | null;
  fat_mass?: number | null;
  BMI?: number | null;
  day: string;
}
