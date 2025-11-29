// the cabin from the remote state
export interface BaseCabin {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: string;
}

export interface Cabin extends BaseCabin {
  id: number;
  created_at: string;
}
