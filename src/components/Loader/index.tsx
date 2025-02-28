import useLoader from "../../contexts/loader/useLoader";

const Loader = () => {
  const { isLoading } = useLoader("loader");

  return isLoading ? (
    <div className="fixed w-full h-full top-0 left-0 backdrop-blur-xs flex flex-col justify-center items-center">
      <span className="loading loading-ring loading-xl"/>
      <p className="text-3xl font-bold">LOADING...</p>
    </div>
  ) : null;
}

export default Loader;