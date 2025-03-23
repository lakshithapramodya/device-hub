"use server";

import axios from "@/utils/axios";
import { CommonResponseDataType, ResponseStatus } from "@/types/common";

type SignInDataType = {
  email: string;
  password: string;
  isRemember?: boolean;
};

type SignInResponseDataType = {
  status: ResponseStatus;
  message: string;
  data: {
    access_token: string;
    refresh_token?: string;
  } | null;
};

// Sign in using email and password
export const signIn = async (
  data: SignInDataType
): Promise<SignInResponseDataType> => {
  try {
    const response = await axios.post("/api/v1/user/login", data);

    return response.data;
  } catch (error) {
    console.log(error);

    return {
      status: ResponseStatus.FAIL,
      message:
        (error as CommonResponseDataType).message ??
        "Something went wrong. Please try again later.",
      data: null,
    };
  }
};
