import { useCallback, useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("category/men's clothing");
  const [isRed, setIsRed] = useState(false);

  const fetchData = useCallback(() => {
    fetch(`https://fakestoreapi.com/products/${category}`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setData(json);

        fetch("https://fakestoreapi.com/products/categories")
          .then((res) => res.json())
          .then((json) => setCategories(json));
      });
  }, [category]);

  useEffect(() => {
    fetchData();
  }, [category]);

  function handleActive(ind) {
    for (let i = 0; i < 4; i++) {
      document.querySelector("#list" + i).classList.remove("active");
    }
    document.querySelector("#list4").classList.remove("active");

    document.querySelector("#list" + ind).classList.add("active");
    setIsRed(true);
  }
  let timer = setTimeout(() => {
    if (!isRed) {
      document.querySelector("#list2").classList.add("active");
      setIsRed(true);
    }
  }, 500);

  return (
    <>
      <header className="shadow">
        <div>
          <h1 className="text-danger">logo</h1>
        </div>

        <div className="con-search d-flex align-items-center">
          <form className="d-flex gap-1" action="">
            <input className="search-bar" type="text" />
            <input
              className="btn btn-dark btn-lg rounded-1"
              type="submit"
              value={"search"}
            />
          </form>
        </div>

        <div className="d-flex align-items-center gap-1">
          <button className="btn btn-primary btn-lg rounded-1">Log in</button>
          <button className="btn btn-primary btn-lg rounded-1">Sign up</button>
        </div>
      </header>

      <div className="con-main">
        <aside className="shadow">
          <div className="con-filters">
            <h2>Categories</h2>
            <ul className="px-0">
              {categories.map((item, index) => {
                return (
                  <li
                    onClick={() => {
                      setCategory(`category/${item}`);
                      handleActive(index);
                    }}
                    className="fs-5 shadow"
                    id={"list" + index}
                  >
                    {item}
                  </li>
                );
              })}
              <li
                id="list4"
                onClick={() => {
                  setCategory("");
                  handleActive(4);
                }}
                className="fs-5 shadow"
              >
                Show All
              </li>
            </ul>
          </div>
        </aside>

        <main>
          <div className="main-content">
            {data.map((item, index) => {
              return (
                <div className="con-product shadow py-4 px-2">
                  <img className="img-product" src={item.image} alt="" />
                  <div className="con-desc">
                    <div>
                      <h3>{item.title}</h3>
                      <p className="rating">
                        <span className="bold">Rating:</span>
                        <span>{item.rating.rate}</span>/5
                      </p>
                      <p className="catagory">
                        <span className="bold">Catagory:</span>
                        {item.category}
                      </p>
                    </div>
                    <p>{item.description}</p>
                    <p className="price">
                      <span className="bold">Price:</span> {item.price}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
