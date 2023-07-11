import { useState } from "react";
import HouzzTooltip from "./ToolTip";

interface IBeerCardProps {
  beerData: any;
}
export default function BeerCard({ beerData }: IBeerCardProps) {
  const [isReadMore, setIsReadMore] = useState(true);
  const [isOnHover, setIsOnHover] = useState(false);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  const handleMouseOverCard = () => {
    setIsOnHover(true);
  };

  const handleMouseLeaveCard = () => {
    setIsOnHover(false);
  };
  return (
    <>
      <div
        className={`card-container ${isOnHover && "hovered"}`}
        onMouseOver={() => handleMouseOverCard()}
        onMouseLeave={() => handleMouseLeaveCard()}
      >
        <HouzzTooltip
          image={beerData.image_url}
          ingredients={beerData.ingredients}
          setIsOnHover={setIsOnHover}
        />

        <div className="content-container">
          <h2>{beerData.name}</h2>
          <p className="label-text">{beerData?.tagline || beerData?.genre}</p>
          <p>
            {isReadMore && beerData.description.length > 80
              ? beerData.description.substr(0, 88)
              : beerData.description}
          </p>
          {beerData.description.length > 80 && (
            <span
              onClick={toggleReadMore}
              className="label-text cursor-pointer"
            >
              {isReadMore ? "...read more" : " ...show less"}
            </span>
          )}
        </div>
      </div>
    </>
  );
}
