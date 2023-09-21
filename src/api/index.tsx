import axios from "axios";
import { ApiData } from "../models";

export const getData = async (): Promise<ApiData[]> => {
  try {
    const response = await axios.get<ApiData[]>(
      process.env.REACT_APP_API_URL as string
    );
    return response.data;
  } catch (error) {
    // Handle any errors here, such as network issues or parsing errors.
    console.error("Error fetching data:", error);
    throw error;
  }
};
