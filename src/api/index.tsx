import axios from "axios";

interface ApiData {
  name: string;
  id: string;
  nametype: string;
  recclass: string;
  mass: string;
  fall: string;
  year: Date;
  reclat: string;
  reclong: string;
  geolocation: {
    type: string;
    coordinates: number[];
  };
}
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
