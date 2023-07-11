import { useState } from "react";
import { useAppDispatch } from "./hooks/redux-hooks";
import "./App.css";
import { useEffect } from "react";
import { handleGetBeers } from "./data/beer-actions";
import { Button } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./beer-styles/style.css";
import MyBeer from "./components/MyBeer";
import CreateBeerModal from "./components/CreateBeer";
import { beerSelctor } from "./data/beer-slice";
import { handleOpenCreateModal, handleSetMyBeer } from "./data/beer-actions";

import { getBeersLocally } from "./helpers/localStorageHelper";
import AllBeer from "./components/AllBeer";

function App() {
  const [activeTab, setActiveTab] = useState(1);
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentLimit, setCurrentLimit] = useState<number>(10);

  const dispatch = useAppDispatch();
  const { isLoading, beers, openCreateModal } = beerSelctor();

  const handleTabClick = (tabNumber: number) => {
    setActiveTab(tabNumber);
  };

  useEffect(() => {
    dispatch(handleGetBeers(`page=${currentPage}&per_page=${currentLimit}`));
  }, []);

  useEffect(() => {
    if (loadMore) {
      console.log("handle load more function called", currentLimit + 10);
      let updatedLimit;
      updatedLimit = currentLimit + 10;
      setCurrentLimit(updatedLimit);
      dispatch(handleGetBeers(`page=${currentPage}&per_page=${updatedLimit}`));
      console.log(`page=${currentPage}&per_page=${updatedLimit}`);
      setLoadMore(false);
    }
  }, [loadMore, currentLimit]);

  useEffect(() => {
    //FETCH FROM LOCAL STORAGE
    let storedBeers = getBeersLocally();
    dispatch(handleSetMyBeer(storedBeers));
  }, []);

  const handleOpenModal = (val: boolean) => {
    dispatch(handleOpenCreateModal(val));
  };
  const handleLoadMore = () => {
    setLoadMore(true);
  };

  if (isLoading) {
    return (
      <div className="loader-container d-flex justtify-content-center align-items-center">
        <h2>Loading...</h2>
      </div>
    );
  }
  return (
    <>
      <div className="tab-header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-8">
              <ul className="tab-list">
                <li
                  onClick={() => handleTabClick(1)}
                  className={activeTab === 1 ? "active tab-item" : "tab-item"}
                >
                  <h2>All Beers</h2>
                </li>
                <li
                  onClick={() => handleTabClick(2)}
                  className={activeTab === 2 ? "active tab-item" : "tab-item"}
                >
                  <h2>My Beers</h2>
                </li>
              </ul>
            </div>
            <div className="col-4">
              {activeTab === 2 && (
                <div className="button-container d-flex justify-content-end">
                  <Button onClick={() => handleOpenModal(true)}>
                    Add a new beer
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {activeTab === 1 && <AllBeer beers={beers} />}

      {activeTab === 2 && <MyBeer />}

      {activeTab === 1 && (
        <div className="button-container text-center">
          <span
            className="text-primary cursor-pointer"
            onClick={() => handleLoadMore()}
          >
            Load More &nbsp; &#9660;
          </span>
        </div>
      )}

      <CreateBeerModal
        handleOpenModal={handleOpenModal}
        openModal={openCreateModal}
      />
    </>
  );
}

export default App;
