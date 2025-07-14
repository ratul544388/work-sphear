import Title from "@/components/title";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router";

const Error = () => {

  return (
    <div className="flex h-[calc(100vh_-_120px)] flex-col items-center justify-center px-4 text-center md:h-[calc(100vh_-_60px)]">
      <Title>Something Went Wrong</Title>
      <h1 className="text-destructive mb-4 text-4xl font-bold">Unexpected Error</h1>
      <p className="text-gray-700">
        Sorry! Something went wrong while loading this page.
      </p>
      <Link to="/" className={buttonVariants({className: "mt-5"})}>
        Go to Home
      </Link>
    </div>
  );
};

export default Error;