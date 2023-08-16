import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, postProduct } from "../../api/products";
import Favorite from "@mui/icons-material/Favorite";
import {
  filterByCategory,
  filterByPriceMax,
  filterByPriceMin,
  setBrandsPop,
  setBrandsPush,
} from "../../reducers/products";
import { Link } from "react-router-dom";

import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Home() {
  const list = useSelector(({ products }) => products.list);
  const priceMin = useSelector(({ products }) => products.priceMin);
  const priceMax = useSelector(({ products }) => products.priceMax);
  const brands = useSelector(({ products }) => products.brands);
  const search = useSelector(({ products }) => products.search);
  console.log(search);

  const selectByCategory = useSelector(
    ({ products }) => products.selectByCategory
  );

  let filteredList = list;
  // filter by category
  if (selectByCategory != "") {
    filteredList = filteredList.filter((el) => {
      return el.category == selectByCategory;
    });
  }
  //filter by min price
  if (priceMin != 0) {
    filteredList = filteredList.filter((el) => {
      return el.price >= priceMin;
    });
  }
  //filter by max price
  if (priceMax != 0) {
    filteredList = filteredList.filter((el) => {
      return el.price <= priceMax;
    });
  }

  const filterBrands = [];

  //Get active brands
  filteredList.map((el) => {
    if (!filterBrands.includes(el.brand)) {
      filterBrands.push(el.brand);
    }
  });

  if (brands.length > 0) {
    filteredList = filteredList.filter((el) => {
      return brands.includes(el.brand);
    });
  }

  //Search products with title and brand
  if (search.toLowerCase() != "") {
    filteredList = filteredList.filter((el) => {
      return (
        el.title.toLowerCase().includes(search.toLowerCase()) ||
        el.brand.toLowerCase().includes(search.toLowerCase())
      );
    });
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  function handleBrands(el) {
    if (!brands.includes(el)) {
      dispatch(setBrandsPush(el));
    } else dispatch(setBrandsPop(el));
  }

  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  function handleBasketAdd(product) {
    dispatch(postProduct(product));
    setOpen(true);
  }

  return (
    <div className="flex gap-6   items-start">
      <div className="bg-[white] py-10 my-10 p-4 rounded-[20px]  w-[20%] sticky top-8">
        <div>
          <Stack spacing={2} sx={{ width: "100%" }}>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                SUCCESSFULLY!
              </Alert>
            </Snackbar>
          </Stack>
        </div>
        <div>
          <p className="font-[600] pb-2">Категория</p>
          <select
            className="border w-[100%] rounded-[8px] p-1 mb-8"
            onChange={(e) => dispatch(filterByCategory(e.target.value))}
            value={selectByCategory}
          >
            <option value="">Выберите категорию</option>
            <option value="shoes">Обувь</option>
            <option value="watch">Часы</option>
            <option value="accessories">Аксессуары для телефонов</option>
            <option value="appliances">Бытовая техника</option>
          </select>
        </div>
        <p className="font-[600]">Цена</p>
        <div className="flex gap-2 ">
          <input
            onChange={(e) => dispatch(filterByPriceMin(e.target.value))}
            className="border rounded-[8px] p-1 my-2 w-[90px]"
            placeholder="от"
            type="number"
          />
          <input
            onChange={(e) => dispatch(filterByPriceMax(e.target.value))}
            className="border rounded-[8px] p-1 my-2 w-[90px]"
            placeholder="до"
            type="number"
          />
        </div>
        <div className="my-6">
          <p className="font-[600] pb-1">Бренд</p>
          {filterBrands.map((el, index) => {
            return (
              <div key={index} className="flex items-center gap-2 pl-2 my-1">
                <input
                  value={brands}
                  className=" cursor-pointer"
                  onChange={() => handleBrands(el)}
                  id={el}
                  type="checkbox"
                />
                <label className=" cursor-pointer" for={el}>
                  {el}
                </label>
              </div>
            );
          })}
        </div>
      </div>
      <div className="my-[40px]">
        <div className="grid  grid-cols-4 gap-4">
          {filteredList.map((elem) => {
            return (
              <div
                key={elem.id}
                className="bg-[white] rounded-[20px] scale hover:shadow tran"
              >
                <Link to={`product/${elem.id}`}>
                  <img
                    className="rounded-t-[20px] w-[100%] "
                    src={elem.img}
                    alt=""
                  />
                </Link>
                <div className="p-4 pt-1">
                  <p className="font-[600] text-[16px] h-[70px]">
                    {elem.title}
                  </p>
                  <div className="flex gap-4 py-2">
                    <p className="">Бренд: </p>
                    <p className="font-[500]">{elem.brand}</p>
                  </div>
                  <div className="flex items-center gap-4 ">
                    <p className="">Цена: </p>
                    <p className="text-[18px] font-[500]">{elem.price} c</p>
                  </div>
                  <div className=" flex items-center justify-between pt-4">
                    <button
                      onClick={() => handleBasketAdd(elem)}
                      className="bg-[blue] py-2 px-8  hover:bg-[#050567] text-[white] rounded-[15px]"
                    >
                      Купить
                    </button>
                    <div>
                      <Favorite className=" hover:text-[red] cursor-pointer text-[gray]" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
