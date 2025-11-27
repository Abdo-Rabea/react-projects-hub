import type { Cabin } from "../types/cabin";
import type { FromCabin } from "../types/FormCabin";
import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log("apiCabins", error);
    throw new Error("There was an error getting your cabins");
  }
  return data;
}

/**
 * Deletes a cabin record from the database using its unique identifier.
 *
 * This function performs a delete operation on the `cabins` table through
 * the Supabase client. Row-Level Security (RLS) must allow the operation
 * in order for the deletion to succeed.
 *
 * @async
 * @function deleteCabin
 * @param {number} id - The unique identifier of the cabin to delete.
 * @returns {Promise<void>} Resolves when the deletion is successful.
 *
 * @throws {Error} Throws an error if the delete operation fails due to
 *   database errors, invalid permissions, or if the cabin cannot be deleted.
 *
 * @example
 * try {
 *   await deleteCabin(12);
 *   console.log("Cabin deleted successfully");
 * } catch (err) {
 *   console.error(err);
 * }
 */
export async function deleteCabin(id: number) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    throw new Error("Can't delete the cabin");
  }
}
// https://dkkxhgdwqmicbaaajvok.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
// todo: create a cabin using supabase client
type CabinPayload = Omit<FromCabin, "image"> & {
  image: File;
};
export async function createCabin(data: CabinPayload) {
  // 0. prepare image path

  // https://dkkxhgdwqmicbaaajvok.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  const imageName = `${Math.random()}-${data.image.name.replace("/", "")}`;
  const imagePath =
    supabaseUrl + "/storage/v1/object/public/cabin-images/" + imageName;

  const cabin: Cabin = { ...data, image: imagePath };

  // 1. create the cabin
  const { data: returnCabin, error } = await supabase
    .from("cabins")
    .insert([cabin])
    .select();

  if (error) {
    throw new Error("Can't create the cabin");
  }

  // 2. upload image
  const { error: UploadImageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, data.image);

  if (UploadImageError) {
    throw new Error("The image can't be uploaded (cabin created.)");
  }
  // ! 3. delete cabin if there is an error uploading image <-- i think it is so bad so i will not so ?

  return returnCabin;
}
