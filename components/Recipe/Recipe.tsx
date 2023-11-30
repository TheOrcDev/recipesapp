import { Recipe } from "@/lib";
import Image from "next/image";
import React from "react";

export default function Recipe({
  title,
  description,
  image,
  ingredients,
  active,
}: Recipe) {
  return (
    <div className="flex flex-col gap-3 w-56">
      <div className="w-full">
        <Image alt={title} src={image} width={300} height={300} />
      </div>
      <div>
        <h3 className="text-centered">{title}</h3>
        {active && (
          <div className="absolute w-96 bg-slate-100 p-2 text-xs">
            <p>{description}</p>
            <ul className="mt-3">
              {ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
