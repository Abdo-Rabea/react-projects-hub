import { createClient } from "@supabase/supabase-js";
// supabase client

// !This key allows anyone to access your database, but enabling RLS ensures that users can only perform actions they are authorized to do.

const supabaseKey: string =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRra3hoZ2R3cW1pY2JhYWFqdm9rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4NTQwNDEsImV4cCI6MjA3OTQzMDA0MX0.OBMx2uTX21NXqgzMTW-gyT8YMK3k0l2SIQkhtrXCXlE";

const supabaseUrl = "https://dkkxhgdwqmicbaaajvok.supabase.co";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
