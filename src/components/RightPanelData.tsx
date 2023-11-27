import React from "react";
import UploadImgForm from "./UploadImgForm";
import ImageHistoryConatiner from "./ImageHistoryConatiner";
import { drawing } from "@/lib/types";
import { redis } from "@/server/middleware";
import GenerateAiImage from "./GenerateAiImage";

export default async function RightPanelData() {
  const allDrawings: drawing[] = await redis.lrange("drawings", -5, -1);
  const generatedAi: string | null = await redis.get("generatedAi");

  return (
    <div className="flex flex-col items-start gap-4 justify-between">
      <UploadImgForm />
      <ImageHistoryConatiner userData={allDrawings} />
      <GenerateAiImage generatedAi={generatedAi} />
    </div>
  );
}
