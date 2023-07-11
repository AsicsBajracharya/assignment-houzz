import BeerCard from "./BeerCard";

interface IAllBeerProps {
  beers: any;
}

export default function AllBeer({ beers }: IAllBeerProps) {
  return (
    <div className="tab-body ">
      <div className="container">
        <div className="row gx-5">
          {beers?.map((beer: any, i: number) => (
            <div className="col-xl-6" key={i}>
              <BeerCard beerData={beer} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
