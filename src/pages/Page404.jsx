import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div>
      <h1>
        ❌ This page not fount, pls return <Link to="/">home page 😢</Link>
      </h1>
    </div>
  );
};

export default Page404;
