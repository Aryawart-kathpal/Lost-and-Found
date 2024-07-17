import { Link, useLoaderData } from "react-router-dom";
import { useState } from "react";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import { AiOutlineMessage } from "react-icons/ai";
import { MdOutlineReportProblem } from "react-icons/md";

export const loader = async ({ params }) => {
  try {
    const response = await customFetch.get(`/items/${params.id}`);
    return { item: response.data.item };
  } catch (error) {
    const errorMessage = error?.response?.data?.msg;
    toast.error(errorMessage);
    return null;
  }
};

const SingleItem = () => {
  const { item } = useLoaderData();
  const { title, category, description, location, date, images, thumbnail, type } = item;

  const [currentIndex, setCurrentIndex] = useState(0);
  const totalImages = images.length + 1;

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? totalImages - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === totalImages - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="align-element">
      <div className="breadcrumbs">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/items">Listings</Link></li>
        </ul>
      </div>

      <div className="grid place-items-center md:grid-cols-2 gap-8">
        <div className="carousel w-full max-w-sm h-[25rem] mt-4 rounded-lg overflow-hidden relative">
          <div
            className="carousel-inner"
            style={{
              display: "flex",
              transition: "transform 0.5s ease-in-out",
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            <div className="carousel-item w-full flex-shrink-0">
              <img src={thumbnail} alt="Item Image" className="object-cover w-full" />
            </div>
            {images.map((image, index) => (
              <div className="carousel-item w-full flex-shrink-0" key={index}>
                <img src={image} alt="Item image" className="object-cover w-full" />
              </div>
            ))}
          </div>
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <button onClick={handlePrev} className={`btn btn-circle ${totalImages <= 1 ? `hidden` : ``}`}>❮</button>
            <button onClick={handleNext} className={`btn btn-circle ${totalImages <= 1 ? `hidden` : ``}`}>❯</button>
          </div>
        </div>
        {/* INFO */}
        <div className="w-full max-w-sm flex flex-col justify-between h-full md:tracking-wider leading-8 lg:leading-8">
          <div>
            <div className="flex justify-between items-center w-full m-2">
              <div className="badge badge-secondary uppercase font-semibold">{type}</div>
              <Link to="#"><AiOutlineMessage className="mr-2 btn btn-ghost btn-circle p-1" /></Link>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl text-center">{title}</h1>
              <h2 className="text-md md:text-xl mt-4 mb-2 font-medium">{description}</h2>
              <h2><span className="font-medium">Location</span> : {location}</h2>
              <h2><span className="font-medium">{type} on </span>: {formatDate(date)}</h2>
              <h2><span className="font-medium">Category </span>: {category}</h2>
            </div>
          </div>
          <Link className="text-xl btn btn-error mt-4"><MdOutlineReportProblem />Report</Link>
        </div>
      </div>
    </div>
  );
};

export default SingleItem;
