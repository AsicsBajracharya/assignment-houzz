import BeerCard from "./BeerCard";

import { useAppDispatch } from "../hooks/redux-hooks";
import { handleOpenCreateModal } from "../data/beer-actions";
import { beerSelctor } from "../data/beer-slice";
export default function MyBeer() {
  const dispatch = useAppDispatch();
  const { myBeers } = beerSelctor();

  const openCreateModal = () => {
    dispatch(handleOpenCreateModal(true));
  };

  if (!myBeers.length) {
    return (
      <div className="tab-body no-content">
        <div className="container text-center">
          <p>
            Nothing to see Yet.{" "}
            <span
              className="text-primary cursor-pointer"
              onClick={openCreateModal}
            >
              Click here
            </span>{" "}
            to add your first beer.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="tab-body">
      <div className="container">
        <div className="row gx-5">
          {myBeers?.map((beer: any, i: number) => (
            <div className="col-xl-6" key={i}>
              <BeerCard beerData={beer} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
