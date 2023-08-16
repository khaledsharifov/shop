import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import SearchIcon from "@mui/icons-material/Search";
import CallIcon from "@mui/icons-material/Call";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import yt from "../assets/yt.svg";
import fb from "../assets/fb.svg";
import inn from "../assets/in.svg";
import ok from "../assets/ok.svg";
import tg from "../assets/tg.svg";
import vb from "../assets/vb.svg";
import vk from "../assets/vk.svg";
import wh from "../assets/wh.svg";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../reducers/products";
import { getProductsBasket } from "../api/products";

export default function Layout() {
  const search = useSelector(({ products }) => products.search);
  const getBasket = useSelector(({ products }) => products.getBasket);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsBasket());
  }, [dispatch]);

  return (
    <div className="">
      <div className="">
        <div className="container m-[0_auto]">
          <div className="w-[90%] m-auto">
            <div className="flex justify-between py-[10px] px-14 items-center bg-[#fff] rounded-b-[15px]">
              <div>
                <Link to={"/"}>
                  <h1 className=" text-[35px] font-[700] text-[blue]">LOGO</h1>
                </Link>
              </div>

              <p className="bg-[blue] flex items-center text-[white] py-2 px-6 font-[600] rounded-[10px] cursor-pointer">
                {" "}
                <MenuIcon className="pr-1" />
                КАТАЛОГ
              </p>
              <div className=" sm:hidden lg:block relative">
                <div className=" absolute top-[0px] right-0 bg-[#DDE7FA] rounded-[15px] p-[6px]">
                  <SearchIcon />
                </div>
                <input
                  value={search}
                  onChange={(e) => dispatch(setSearch(e.target.value))}
                  className=" w-[360px]  outline-none bg-[#F6F7F9] px-5 rounded-[15px] py-2"
                  placeholder="Поиск "
                  type="text"
                />
              </div>
              <div className="lg:flex sm:hidden items-center gap-2 text-[15px]">
                <div className="bg-[#DDE7FA] rounded-[15px] p-[6px]">
                  <CallIcon />
                </div>
                <div>
                  <p className="font-[700] text-[16px]">(92) 979-00-59</p>
                  <p>с 8:00 до 21:00</p>
                </div>
              </div>
              <div className="lg:flex sm:hidden   items-center gap-2 px-4">
                <Link to={""}>
                  <div className="bg-[#DDE7FA] rounded-[15px] p-[6px]">
                    <PersonIcon />
                  </div>
                </Link>
                <Stack
                  spacing={4}
                  direction="row"
                  sx={{ color: "action.active" }}
                >
                  <Link to={""}>
                    <Badge
                      className="bg-[#DDE7FA] rounded-[15px] p-[6px] text-[black]"
                      color="primary"
                      badgeContent={0}
                      showZero
                    >
                      <FavoriteBorderIcon />
                    </Badge>
                  </Link>
                </Stack>
                <Stack
                  spacing={4}
                  direction="row"
                  sx={{ color: "action.active" }}
                >
                  <Link to={"basket"}>
                    <Badge
                      className="bg-[#DDE7FA] rounded-[15px] p-[6px] text-[black]"
                      color="primary"
                      badgeContent={getBasket.length}
                      showZero
                    >
                      <LocalGroceryStoreOutlinedIcon />
                    </Badge>
                  </Link>
                </Stack>
              </div>
            </div>
          </div>
        </div>
        <Outlet />
        <div className="lg:hidden fixed bottom-0 z-10  w-[100%] bg-[#fff]  ">
          <div className="flex  justify-between py-[10px] sm:w-[90%] md:w-[80%] m-auto">
            <Link to={"/"}>
              <div className=" text-center">
                <HomeIcon />
                <p className="text-[12px]">Главная</p>
              </div>
            </Link>
            <div className=" text-center">
              <MenuIcon />
              <p className="text-[12px]">Каталог</p>
            </div>
            <Link to={"/basket"}>
              <div className=" text-center">
                <ShoppingCartIcon />
                <p className="text-[12px]">Корзина</p>
              </div>
            </Link>
            <div className=" text-center">
              <FavoriteBorderIcon />
              <p className="text-[12px]">Избранное</p>
            </div>
            <Link to={"login"}>
              <div className=" text-center">
                <PersonIcon />
                <p className="text-[12px]">Кабинет</p>
              </div>
            </Link>
          </div>
        </div>
        <div className="container m-[0_auto]">
          <div className="w-[90%] m-auto">
            <div>
              <div className="">
                <div className=" bg-[#fff] rounded-t-[15px]">
                  <div className=" flex sm:flex-wrap lg:gap-0 sm:gap-10  justify-between py-8 px-14">
                    <ul>
                      <li className="py-1">Подробнее</li>
                      <li className="py-1">Доставка и оплата</li>
                      <li className="py-1">Гарантия и возврат</li>
                    </ul>
                    <ul>
                      <li className="py-1">Политика</li>
                      <li className="py-1">конфиденциальности</li>
                      <li className="py-1">Сотрудничество</li>
                    </ul>
                    <ul>
                      <li className="py-1">Личный кабинет</li>
                      <li className="py-1">Избранное</li>
                      <li className="py-1">Отзывы</li>
                    </ul>
                    <ul>
                      <li className="py-1">Мы в соцсетях:</li>
                      <li className="flex items-center gap-2 py-3">
                        <img src={fb} alt="" />
                        <img src={vk} alt="" />
                        <img src={inn} alt="" />
                        <img src={ok} alt="" />
                        <img src={yt} alt="" />
                      </li>
                    </ul>

                    <ul>
                      <li className="py-1">Связаться с нами</li>
                      <li className="py-1">
                        <div className="flex items-center gap-2 text-[15px] relative right-[45px]">
                          <div className="bg-[#DDE7FA] rounded-[15px] p-[6px]">
                            <CallIcon />
                          </div>
                          <div>
                            <p className="font-[700] text-[16px]">
                              (92) 979-00-59
                            </p>
                            <p>с 8:00 до 21:00</p>
                          </div>
                        </div>
                      </li>
                      <li className="py-1">Напишите нам</li>
                      <li className="flex items-center gap-2 py-3">
                        <img src={vb} alt="" />
                        <img src={wh} alt="" />
                        <img src={tg} alt="" />
                      </li>
                    </ul>
                  </div>
                  <p className=" text-center pb-[50px]">
                    © 2023 ИП Каюмов А.Д. Все права защищены.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
