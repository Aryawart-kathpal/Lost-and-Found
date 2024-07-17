import { Link } from "react-router-dom";

const ItemCard = ({ item }) => {
  const { title, thumbnail, description, type, location, category, date } = item;

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  const link = `/items/${item._id}`;
  return (
    <Link to={link} >
      <div className="card card-compact bg-base-300 duration-300 w-72 h-[27rem] hover:shadow-xl flex flex-col">
      <figure>
        <img src={thumbnail} className="object-cover h-48
         w-full" alt={title} />
      </figure>
      <div className="card-body">
          <div className="w-full flex justify-between items-center">
            <h2 className="card-title w-full">
              {title}
            </h2>
            <div className="badge badge-secondary uppercase">{type}</div>
          </div>
          <p className="text-sm text-base mb-3">{description}</p>
          <p className="text-sm text-base"> <span className="font-semibold">Found at</span> : {location}</p>
          <p className="text-sm text-base"> <span className="font-semibold">Date Found</span> : {formatDate(date)}</p>
          <Link to='/'>
            <button className="btn btn-outline btn-secondary btn-block mt-4 rounded-2xl"><span>Message</span></button>
          </Link>
      </div>
    </div>
    </Link>
  );
};

export default ItemCard;
