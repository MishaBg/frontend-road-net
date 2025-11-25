export interface ICity {
  id: number;
  name: string;        
  image?: string;
  description: string;
  coordinates_l: number;
  coordinates_w: number;
  center: boolean;
}

export interface IPaginatedCitys {
  items: ICity[];
  total: number;
}

export interface ICrumb {
  label: string;
  path?: string;
  active?: boolean;
}

export interface ICartBadge {
    city_id: number | null;
    count: number;
}

export interface BreadcrumbsProps {
  crumbs: ICrumb[];
}

export interface CityCardProps {
    city: ICity;
}

export interface FilterState {
    searchTerm: string;
}