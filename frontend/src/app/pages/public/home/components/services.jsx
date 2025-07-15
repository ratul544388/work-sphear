import Container from "@/components/container";
import SectionHeading from "@/components/section-heading";
import { services } from "@/constants";

const Services = () => {
  return (
    <section className="bg-accent/30 mt-10 py-8">
      <Container>
        <SectionHeading className="mt-8">Services</SectionHeading>
        <ul className="grid grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
          {services.map(({ title, description, icon: Icon }, i) => (
            <li
              key={i}
              className="p-5 border-2 border-foreground/80 rounded-md flex flex-col items-center"
            >
              <Icon className="size-10" />
              <p className="mt-2 font-semibold text-lg text-center">{title}</p>
              <p className="text-muted-foreground mt-4 text-center">{description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};

export default Services;
