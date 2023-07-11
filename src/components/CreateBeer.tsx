import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import beerImg from "../assets/houzzbeer.png";
import { useAppDispatch } from "../hooks/redux-hooks";
import { handleCreateBeer } from "../data/beer-actions";
import { beerSelctor } from "../data/beer-slice";

interface ICreateBeerModalProps {
  openModal: boolean;
  handleOpenModal: (val: boolean) => void;
}

function CreateBeerModal({
  openModal,
  handleOpenModal,
}: ICreateBeerModalProps) {
  const [name, setName] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string>("");
  const dispatch = useAppDispatch();
  const { myBeers } = beerSelctor();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !genre || !description) {
      setError("All Fields are required");
      return;
    }
    console.log(myBeers);
    dispatch(
      handleCreateBeer({
        name,
        genre,
        description,
      })
    );
    handleOpenModal(false);
  };

  useEffect(() => {
    if (error) {
      const timeoutID = window.setTimeout(() => {
        setError("");
      }, 1500);
      return () => window.clearTimeout(timeoutID);
    }
  }, [error]);

  return (
    <>
      <Modal
        show={openModal}
        onHide={() => handleOpenModal(false)}
        centered
        className="create-beer-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add a New Beer</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="image-outer-container">
              <div className="image-container">
                <img src={beerImg} alt="" />
              </div>
            </div>

            <div className="input-group">
              <input
                type="text"
                placeholder="Beer Name*"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                placeholder="Genre*"
                className="form-control"
                name="genre"
                onChange={(e) => setGenre(e.target.value)}
              />
            </div>
            <div className="input-group">
              <textarea
                placeholder="Description*"
                className="form-control"
                name="description"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            {error && <p className="error">{error}</p>}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => handleOpenModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default CreateBeerModal;
