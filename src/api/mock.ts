import type {IPaginatedCitys} from "../types/index.ts";

export const CITYS_MOCK: IPaginatedCitys = {
  total: 3,
  items: [
    {
      id: 101,
      name: "Москва",
      description: "Москва-столица России",
      image: "http://localhost:9000/web/moscow.jpeg",
      coordinates_l: 1.0,
      coordinates_w: 2.0,
      center: false,
    },
    {
      id: 102,
      name: "Санкт-Петербург",
      description: "Культурная страница России",
      image:"http://localhost:9000/web/piter.webp",
      coordinates_l: 1.0,
      coordinates_w: 2.0,
      center: false,
    },
    {
      id: 103,
      name: "Сочи",
      description: "Курортная столица России",
      image:"http://localhost:9000/web/piter.webp",
      coordinates_l: 1.0,
      coordinates_w: 2.0,
      center: false,
    },
  ],
};