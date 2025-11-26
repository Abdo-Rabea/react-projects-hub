import supabase from "./supabase";

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
