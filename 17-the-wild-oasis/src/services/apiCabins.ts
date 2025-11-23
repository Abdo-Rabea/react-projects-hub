import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log("apiCabins", error);
    throw new Error("Can not load the cabins");
  }
  return data;
}
