export interface ApiData {
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