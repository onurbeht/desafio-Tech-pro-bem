import React from "react";

import Image from "next/image";
import { Button } from "./ui/button";

export const Card = ({ data }) => {
  return (
    <>
      <div className="bg-zinc-200 dark:bg-transparent p-4 rounded-md">
        <h1 className="text-wrap font-extrabold text-lg sm:text-3xl">
          {data.title}
        </h1>
        {data.multimedia ? (
          <figure>
            <Image
              src={data.multimedia[1].url}
              alt={data.multimedia[1].caption}
              width={data.multimedia[1].width}
              height={data.multimedia[1].height}
              priority={true}
              className="sm:size-full lg:size-10/12"
            />
            {data.multimedia[1].copyright ? (
              <figcaption>
                copyright - {data.multimedia[1].copyright}
              </figcaption>
            ) : (
              ""
            )}
          </figure>
        ) : (
          ""
        )}
        <p className="mt-2 mb-2 sm:text-xl">{data.abstract}</p>
        <div className="flex flex-col justify-between pt-2 items-start sm:flex-row">
          <a href={data.url} target="_blank">
            <Button variant="outline" className="sm:text-2xl">
              Read more
            </Button>
          </a>
          <p className="sm:text-2xl">{data.byline}</p>
        </div>
      </div>
    </>
  );
};
