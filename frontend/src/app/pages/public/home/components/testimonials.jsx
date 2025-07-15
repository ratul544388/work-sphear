import Container from "@/components/container";
import { Marquee, MarqueeItem } from "@/components/marquee";
import SectionHeading from "@/components/section-heading";
import { reviews } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Testimonials = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const { data } = await axios.get("https://randomuser.me/api/?results=24");
      const result = data.results.map((r, i) => ({
        id: r.login.uuid,
        username: `@${r.name.first.toLowerCase()}_${r.name.last.toLowerCase()}`,
        image: r.picture.thumbnail,
        comment: reviews[i % reviews.length],
      }));

      return result;
    },
  });

  if (isError) return <p>Failed to load testimonials.</p>;

  return (
    <Container className="mt-20">
      <SectionHeading className="mb-8">
        What Our Customers Say
      </SectionHeading>
      {isPending && <span className="loader mx-auto block" />}
      <Reviews reviews={data} slice={[1, 8]} />
      <Reviews reviews={data} slice={[9, 16]} position="right" />
      <Reviews reviews={data} slice={[17, 24]} />
    </Container>
  );
};

const Reviews = ({ reviews, slice, position = "left" }) => {
  return (
    <Marquee position={position}>
      {reviews?.slice(...slice).map((user) => (
        <MarqueeItem
          key={user.id}
          className="bg-background hover:bg-primary/5 flex w-[300px] flex-col gap-5 rounded-lg border p-5 shadow-md transition-colors"
        >
          <p className="text-sm">{user.comment}</p>
          <div className="mt-auto flex items-center gap-3">
            <img
              src={user.image}
              alt={user.username}
              className="h-10 w-10 rounded-full bg-accent"
            />
            <p className="font-semibold">{user.username}</p>
          </div>
        </MarqueeItem>
      ))}
    </Marquee>
  );
};

export default Testimonials;
