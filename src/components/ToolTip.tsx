import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { getKeysAsString } from "../utils";
import beerImg from "../assets/houzzbeer.png";

interface IHouzztooltipProps {
  image: string;
  ingredients: any;
  setIsOnHover: (val: boolean) => void;
}

export default function HouzzTooltip({
  image,
  ingredients,
  setIsOnHover,
}: IHouzztooltipProps) {
  const handleMouseOverImage = (e: any) => {
    e.stopPropagation();
    setIsOnHover(false);
  };

  return (
    <div
      className="image-container"
      onMouseOver={(e) => handleMouseOverImage(e)}
    >
      <OverlayTrigger
        delay={{ hide: 450, show: 300 }}
        overlay={(props) => (
          <Tooltip {...props}>
            Ingredients: {ingredients && getKeysAsString(ingredients)}
          </Tooltip>
        )}
        placement="top"
      >
        <img src={image || beerImg} alt="" />
      </OverlayTrigger>
    </div>
  );
}
