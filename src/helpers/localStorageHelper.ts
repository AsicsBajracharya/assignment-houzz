export const setBeersLocally = (beers: any) => {
  localStorage.setItem("my-beers", JSON.stringify(beers));
};

export const getBeersLocally = () => {
  const data = localStorage.getItem("my-beers");

  return data ? JSON.parse(data) : [];
};
