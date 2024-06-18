import React from "react";

const About = () => {
  return (
    <section className="container flex min-h-screen flex-col items-center justify-center pt-2 ">
      <p className="pb-2 text-2xl font-bold">Tech Pro Bem</p>

      <div className="border-2 border-black rounded-md dark:border-zinc-600">
        <p className="p-2 border-b-2 border-black dark:border-zinc-600">
          <strong>English:</strong> This site is part of a challenge. All data
          used on this site is the property of The New York Times.
        </p>
        <p className="p-2">
          <strong>Português:</strong> Este site faz parte de um desafio. Todos
          os dados utilizados neste site são de propriedade do The New York
          Times.
        </p>
      </div>
      <p className="pt-2 text-xl font-bold">
        Created by{" "}
        <a
          href="https://github.com/onurbeht"
          target="_blank"
          className="underline"
        >
          Bruno Oliveira
        </a>
      </p>
    </section>
  );
};

export default About;
