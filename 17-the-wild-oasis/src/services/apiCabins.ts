import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log("apiCabins", error);
    throw new Error("There was an error getting your cabin");
  }
  return data;
}
