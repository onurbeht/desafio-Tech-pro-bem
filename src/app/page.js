"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React, { useEffect, useState } from "react";
import { Card } from "@/components/Card";
import { CardCarousel } from "@/components/CardCarousel";

export default function Home() {
  const [data, setData] = useState([]);
  const [first, setFirst] = useState({});
  const [world, setWorld] = useState([]);
  const [loading, setLoading] = useState(true);

  let previousSection = null; //Used in map()

  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })
  ); //Used in Carousel

  const url = process.env.NEXT_PUBLIC_API_URL;
  const key = process.env.NEXT_PUBLIC_API_KEY;

  async function getData(url) {
    setLoading(true);
    const req = await fetch(url)
      .then((res) => res.json())
      .catch(() => console.log("Error"));

    setData(req.results);
  }

  useEffect(() => {
    getData(url + key);
  }, []);

  useEffect(() => {
    const articleOne = data.shift();
    setFirst(articleOne);

    setWorld(
      data.filter((obj, i) => {
        if (obj.section == "world") {
          data.splice(i, 1);
          return obj;
        }
      })
    );

    data.sort((article1, article2) => {
      if (article1.section === article2.section) {
        return 0;
      }
      return article1.section < article2.section ? -1 : 1;
    });

    setLoading(false);
  }, [data]);

  return loading ? (
    <p className="min-h-screen">Loading...</p>
  ) : (
    <main className="flex min-h-screen flex-col justify-between p-2 lg:mx-auto lg:my-0 lg:max-w-screen-md ">
      {first ? (
        <article className="flex flex-col justify-start ">
          <span className="bg-red-600 p-2 w-fit font-extrabold rounded-md mb-1 ">
            NEW
          </span>
          <div className="bg-zinc-200 dark:bg-transparent p-4 rounded-md ">
            <div className="lg:flex lg:flex-row-reverse lg:justify-between">
              <h1 className="text-wrap font-extrabold text-lg sm:text-3xl lg:size-1/3 ">
                {first.title}
              </h1>
              <figure className="lg:size-2/3">
                <Image
                  src={first.multimedia[1].url}
                  alt={first.multimedia[1].caption}
                  width={first.multimedia[1].width}
                  height={first.multimedia[1].height}
                  priority={true}
                  className="sm:size-11/12 "
                />
                {first.multimedia[1].copyright ? (
                  <figcaption>
                    copyright - {first.multimedia[1].copyright}
                  </figcaption>
                ) : (
                  ""
                )}
              </figure>
            </div>
            <div className="">
              <p className="mt-2 mb-2 sm:text-xl ">{first.abstract}</p>
              <div className="flex flex-col justify-between pt-2 items-start sm:flex-row ">
                <a href={first.url} target="_blank">
                  <Button variant="outline" className=" sm:text-2xl">
                    Read more
                  </Button>
                </a>
                <p className="sm:text-2xl">{first.byline}</p>
              </div>
            </div>
          </div>
        </article>
      ) : (
        ""
      )}

      <section className="flex flex-col justify-start ">
        <div className="max-w-screen-sm  flex flex-col justify-start items-start mt-8">
          <div className="max-w-full bg-red-600 p-2 font-extrabold rounded-md mb-1 m-1 uppercase">
            World
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7">
            <Carousel
              className="w-full max-w-full col-start-1 col-span-3 sm:col-span-5 sm:col-start-1 md:col-span-5 md:col-start-2"
              plugins={[plugin.current]}
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
            >
              <CarouselContent>
                {world.map((obj) => (
                  <CarouselItem
                    key={obj.uri}
                    className="basis-10/12 sm:basis-3/4 md:basis-4/5 lg:basis-11/12"
                  >
                    <CardCarousel data={obj} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex md:col-span-1 md:col-start-1" />
              <CarouselNext className="hidden md:flex md:col-span-1 md:col-start-7" />
            </Carousel>
          </div>
        </div>

        {data.map((obj, i) => {
          previousSection = i > 0 ? data[i - 1].section : "";

          return (
            <article
              key={obj.uri}
              className="mt-2 dark:border-t-2 dark:border-zinc-600"
            >
              {obj.section !== previousSection ? (
                <div className="max-w-full bg-red-600 p-2 font-extrabold rounded-md mb-1 m-1 uppercase">
                  {obj.section}
                </div>
              ) : (
                ""
              )}
              <Card data={obj} />
            </article>
          );
        })}
      </section>
    </main>
  );
}
