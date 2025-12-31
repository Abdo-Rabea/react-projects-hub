import supabase, { supabaseUrl } from "./supabase";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function signUp({
  email,
  password,
  fullName,
  avatar = "",
}: {
  email: string;
  password: string;
  fullName: string;
  avatar?: string;
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { fullName, avatar } },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    return null;
  }

  return user;
}

// todo: updates the user on supabase with 2 modes (password) or fullName, avatar
// deals with it just like if the feild exists then update me

export async function updateCurrentUser({
  password,
  fullName,
  avatar,
}: {
  password?: string;
  fullName?: string;
  avatar?: File | null;
}) {
  let updateObj = {};
  if (password) updateObj = { password };
  if (fullName) updateObj = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateObj);

  if (error) if (error) throw new Error(error.message);

  if (!avatar) return data;

  // upload avatar
  const { data: avatarData, error: UploadImageError } = await supabase.storage
    .from("avatars")
    .upload(`${Math.random()}-${avatar.name.replace("/", "")}`, avatar);

  if (UploadImageError) {
    throw new Error("The avatar image can't be updated! please try again ");
  }
  const avatarUrl: string =
    supabaseUrl + "/storage/v1/object/public/" + avatarData.fullPath;

  const { data: data2, error: error2 } = await supabase.auth.updateUser({
    data: { avatar: avatarUrl },
  });

  if (error2) throw new Error(error2.message);

  return data2;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
