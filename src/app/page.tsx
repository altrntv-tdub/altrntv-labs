import { Hero } from "@/components/sections/hero";
import { WhatWeDo } from "@/components/sections/what-we-do";
import { WhoWeServe } from "@/components/sections/who-we-serve";
import { Credibility } from "@/components/sections/credibility";
import { ClosingCTA } from "@/components/sections/cta";

export default function Home() {
  return (
    <>
      <Hero />
      <WhatWeDo />
      <WhoWeServe />
      <Credibility />
      <ClosingCTA />
    </>
  );
}
