import { get } from "../utils";

// const baseUrl = new URL(import.meta.env.VITE_REST_COUNTRIES_URL);

// export type RestCountry = {
//   name: string;
// };

// export function getRestCountries() {
//   return get(new URL("all", baseUrl)).then((response) => {
//     const countries: {
//       name: { common: string };
//     }[] = response;

//     return countries.map((country) => country.name.common);
//   });
// }

const baseUrl = new URL("rest_countries/all", import.meta.env.VITE_API_URL);

export type RestCountries = {
  countries: { name: string };
};

export function getRestCountries() {
  return get(baseUrl).then((response) => {
    return response.countries.map((country: any) => country.name);
  });
}
