"use server";

import { Stroke } from "@/hooks/useCanvas";
import { redis } from "./middleware";
import { revalidatePath } from "next/cache";
import { uid } from "uid";

export async function saveImage(canvasInFo: any) {
  console.log("canvasInFo", canvasInFo);
}

export async function handleRedis(
  formData: FormData,
  image: string,
  strokes: Stroke[]
) {
  const id = uid();
  if (image == "") {
    return;
  }
  let upload = {
    name: formData.get("name"),
    base64: image,
    strokes: strokes,
    id: id,
  };
  await redis.rpush("drawings", upload);
  await redis.ltrim("drawings", -5, -1);

  revalidatePath("/");
}
