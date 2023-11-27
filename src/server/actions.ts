"use server";

import { Stroke } from "@/hooks/useCanvas";
import { redis } from "./middleware";
import { revalidatePath } from "next/cache";
import { uid } from "uid";

import Replicate from "replicate";
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function checkStatus(id: string) {
  console.log("id inside the function", id);
  const newResponse = await fetch(
    `https://api.replicate.com/v1/predictions/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
  const bla = await newResponse.json();
  console.log("bla", bla);
  console.log("what is this --> ", bla.status);
  return bla;
}

export async function generateAI(formdata: any, image: string) {
  console.log("image", image);
  const prompt = formdata.get("prompt");
  console.log("prompt", prompt);
  const response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      version:
        "435061a1b5a4c1e26740464bf786efdfa9cb3a3ac488595a2de23e143fdb0117",

      input: {
        eta: 0,
        // image:"https://replicate.delivery/pbxt/IJE6zP4jtdwxe7SffC7te9DPHWHW99dMXED5AWamlBNcvxn0/user_1.png",
        image: image,
        scale: 7,
        // prompt: "a photo of a brightly colored turtle",
        prompt: prompt,
        // a_prompt: "best quality, extremely detailed",
        // n_prompt:
        //   "longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality",
        // ddim_steps: 20,
        num_samples: "1",
        image_resolution: "512",
      },
    }),
  });

  const prediction = await response.json();
  let id = prediction.id;
  console.log("id", id);

  let check;
  console.log("check", check);

  while (true) {
    await sleep(2000);

    check = await checkStatus(id);
    console.log("check", check.status);

    if (check.status == "succeeded" || check.status == "failed") {
      console.log("check", check.status);
      await redis.set("generatedAi", check.output[1]);
      break;
    }

    revalidatePath("/");
  }
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
