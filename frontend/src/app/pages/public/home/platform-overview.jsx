import Container from "@/components/container";
import SectionHeading from "@/components/section-heading";
import { Separator } from "@/components/ui/separator";
import React from "react";

const PlatformOverview = () => {
  return (
    <Container className="mt-12">
      <SectionHeading gradient>
        The Most Complete Platform for the Modern Workforce
      </SectionHeading>
      <Separator className="mt-3 max-w-[300px] mx-auto" />
      <p className="font-medium text-center mt-8">
        Legacy HR software is designed to give employers what they need to
        automate, but no single solution has paired the capabilities HR needs
        with what employees are looking for … until now.
      </p>
      <img src="/overview.webp" alt="Overview" className="mt-5 pointer-events-none" />
    </Container>
  );
};

export default PlatformOverview;
