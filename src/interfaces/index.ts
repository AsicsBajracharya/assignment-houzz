export interface IBaseError {
  message: string;
}

export interface IBaseState {
  isLoading: boolean;
  error: IBaseError | null;
}
