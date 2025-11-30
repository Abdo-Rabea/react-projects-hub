import type { BaseCabin } from "../types/cabin";
import type { CabinPayload } from "../types/FormCabin";
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
// there is an id ->
//                with file -> do the same image logic and update cabin.image
//                with
export async function createEditCabin(data: CabinPayload, id?: number) {
  // 0. prepare image path
  const isEditing = !!id;

  let imageName: string = "",
    imagePath: string = "";

  const withNewImage = typeof data.image === "object";
  // same condition
  if (withNewImage && typeof data.image === "object") {
    imageName = `${Math.random()}-${data.image.name.replace("/", "")}`;
    imagePath =
      supabaseUrl + "/storage/v1/object/public/cabin-images/" + imageName;
  } else if (typeof data.image !== "object") imagePath = data.image;

  const cabin: BaseCabin = { ...data, image: imagePath };

  // 1. create the cabin
  const query = supabase.from("cabins");
  let returnData;
  if (isEditing) {
    const { data, error } = await query
      .update(cabin)
      .eq("id", id)
      .select()
      .single();
    if (error) {
      throw new Error("can't update the cabin");
    }
    returnData = data;
  } else {
    const { data, error } = await query.insert([cabin]).select().single();

    if (error) {
      throw new Error("Can't create the cabin");
    }
    returnData = data;
  }

  // 2. upload image
  if (withNewImage && typeof data.image === "object") {
    const { error: UploadImageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, data.image);

    if (UploadImageError) {
      throw new Error("The image can't be uploaded (cabin created.)");
    }
  }
  // ! 3. delete cabin if there is an error uploading image <-- i think it is so bad so i will not so ?

  return returnData;
}
