import { get } from "../utils";

const baseUrl = new URL(import.meta.env.VITE_REST_COUNTRIES_URL);

export type RestCountry = {
  name: string;
};

export function getRestCountries() {
  return get(new URL("all", baseUrl)).then((response) => {
    const countries: {
      name: { common: string };
    }[] = response;

    return countries.map((country) => country.name.common);
  });
}
