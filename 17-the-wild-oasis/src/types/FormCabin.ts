export interface FromCabin {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: FileList;
}

export type CabinPayload = Omit<FromCabin, "image"> & {
  image: File | string;
};
