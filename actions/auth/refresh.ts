"use server";

import axios from "axios";

export const refreshToken = async (token: string) => {
  try {
    const res = await axios.post(
      `${process.env.BASE_URL}/api/v1/user/refresh`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      status: "SUCCESS",
      message: "Token refreshed",
      data: {
        token: res.data?.data?.access_token,
        refreshToken: res.data?.data?.refresh_token,
      },
    };
  } catch (error) {
    console.log(error);

    return {
      status: "FAIL",
      message: "Something went wrong. Please try again later.",
      data: null,
    };
  }
};
