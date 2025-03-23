/* eslint-disable @typescript-eslint/no-explicit-any */
export enum ResponseStatus {
  SUCCESS = "SUCCESS",
  FAIL = "FAIL",
}

export type CommonResponseDataType = {
  status: ResponseStatus;
  message: string;
  data: any;
};
