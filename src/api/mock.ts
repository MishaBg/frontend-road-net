import type {IPaginatedCitys} from "../types/index.ts";

export const CITYS_MOCK: IPaginatedCitys = {
  total: 3,
  items: [
    {
      id: 101,
      name: "Москва",
      description: "Москва-столица России",
      image: "mock_images/default.jpeg",
      coordinates_l: 1.0,
      coordinates_w: 2.0,
      center: false,
    },
    {
      id: 102,
      name: "Санкт-Петербург",
      description: "Культурная страница России",
      image:"mock_images/default.jpeg",
      coordinates_l: 1.0,
      coordinates_w: 2.0,
      center: false,
    },
    {
      id: 103,
      name: "Сочи",
      description: "Курортная столица России",
      image:"mock_images/default.jpeg",
      coordinates_l: 1.0,
      coordinates_w: 2.0,
      center: false,
    },
  ],
};