"use client";
import React from "react";
import { useFormStatus } from "react-dom";

export default function ButtonSubmit() {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending ? true : false}
      className={`${
        pending && "opacity-25"
      } cursor-pointer hover:scale-110 active:scale-95 hover:bg-slate-200  transition-all p-1 rounded-md border-black border-2 bg-slate-400`}
    >
      {" "}
      AI ME{" "}
    </button>
  );
}
