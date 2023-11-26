import React from "react";
import UploadImgForm from "./UploadImgForm";
import ImageHistoryConatiner from "./ImageHistoryConatiner";
import { drawing } from "@/lib/types";
import { redis } from "@/server/middleware";

export default async function RightPanelData() {
  const allDrawings: drawing[] = await redis.lrange("drawings", -5, -1);
  return (
    <div className="flex flex-col items-center justify-center">
      <UploadImgForm />
      <ImageHistoryConatiner userData={allDrawings} />
    </div>
  );
}
