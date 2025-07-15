import Container from "@/components/container";
import SectionHeading from "@/components/section-heading";
import { Separator } from "@/components/ui/separator";
import { coreValues } from "@/constants";
import React from "react";

const CoreValues = () => {
  return (
    <Container elem="section" className="mt-20">
      <SectionHeading gradient>What Makes Paylocity Different?</SectionHeading>
      <Separator className="max-w-[300px] mx-auto mt-5" />
      <p className="mt-10 text-center">
        We&apos;re more than just a provider. We&apos;re a partner to our clients. And
        that&apos;s what “Forward Together” represents — always innovating, always
        ensuring progress together.
      </p>
      <ul className="grid lg:grid-cols-3 gap-x-10 gap-y-14 mt-12">
        {coreValues.map(({ icon: Icon, title, description }, i) => (
          <li key={i} className="text-foreground/70">
            <div className="flex items-center gap-3">
              <Icon className="size-14" />
              <h4 className="text-2xl font-bold">{title}</h4>
            </div>
            <p className="mt-4 font-medium">{description}</p>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default CoreValues;
