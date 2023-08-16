import React, { useEffect, useRef, useState } from "react";

import Box from "@mui/material/Box";
import { Tab } from "@mui/material";
import { TabContext } from "@mui/lab";
import { TabList } from "@mui/lab";
import { TabPanel } from "@mui/lab";

import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductById,
  getProductsBasket,
  postProduct,
} from "../../api/products";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Product() {
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const navigate = useNavigate();
  const productId = useParams().productId;

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductById(productId));
    dispatch(getProductsBasket());
  }, [dispatch]);

  const result = useSelector(({ products }) => products.product);

  if (result.status == 404) {
    navigate("404");
  }
  
  const product = result.data;

  function handleBasketAdd(product) {
    dispatch(postProduct(product));
    setOpen(true);
  }

  return (
    <div className="container m-[0_auto]">
      <div className="w-[90%] m-auto">
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
        <div className="">
          <div className="">
            <div className="my-[50px] lg:flex items-start bg-[#fff] p-[20px] rounded-[20px]">
              <div className="w-[70%] ">
                <img
                  src={product?.img}
                  alt=""
                  className="w-[100%] px-6 rounded-[40px]"
                />
              </div>
              <div className="px-6 w-[100%]">
                <p className="text-[20px] font-[600]">{product?.title}</p>
                <p className="pt-[5px]">Просмотров: 126</p>
                <p>
                  Цена:{" "}
                  <span className="text-[30px] font-[700]">
                    {" "}
                    {product?.price} c.
                  </span>
                </p>
                <div className="flex gap-2 py-[5px]">
                  <button
                    onClick={() => handleBasketAdd(product)}
                    className="bg-[blue] py-2 px-10 text-[16px]  hover:bg-[#050567] text-[white] rounded-[15px]"
                  >
                    Купить
                  </button>
                  <button className="bg-[#E76B00] py-2 px-6 text-[16px]  hover:bg-[#a95307] text-[white] rounded-[15px]">
                    Быстрый заказ
                  </button>
                </div>
                <div className="flex items-center py-2 gap-8">
                  <p className="text-[20px] lg:w-[38%] text-[blue]">
                    Бесплатная доставка в течении 5-7 дней
                  </p>
                </div>

                <div className="py-[10px]">
                  <Box sx={{ width: "100%", typography: "body1" }}>
                    <TabContext value={value}>
                      <Box>
                        <TabList
                          onChange={handleChange}
                          aria-label="lab API tabs example"
                        >
                          <Tab
                            sx={{
                              border: 1,
                              borderColor: "#ddd",
                              marginRight: 1,
                            }}
                            label="Описание"
                            value="1"
                          />
                          <Tab
                            sx={{ border: 1, borderColor: "#ddd" }}
                            label="Доставка и оплата"
                            value="2"
                          />
                        </TabList>
                      </Box>
                      <TabPanel value="1" className="border">
                        <div>
                          <p className="font-[700] pb-1">
                            Основные характеристики:
                          </p>
                          <p className="py-1">{product?.description}</p>
                        </div>
                      </TabPanel>
                      <TabPanel value="2" className="border">
                        <div>
                          <p>
                            Доставка по Таджикистану осуществляется в течении
                            1-2 рабочих дней в зависимости от Вашего города или
                            района.{" "}
                          </p>
                          <p className="py-4">
                            Доставка по Таджикистану осуществляется нашими
                            курьерами и она БЕСПЛАТНАЯ.
                          </p>
                          <p className="py-4">
                            Доставка осуществляется в течении рабочего дня
                            начиная с 13:00 до 18:00 каждый день, без выходных.{" "}
                          </p>
                          <p className="text-[#ff4d00] pt-4">* Примечание:</p>
                          <p className="py-4">
                            {" "}
                            Срок доставки некоторых товаров может достигать до
                            7-8 дней и зависит от категории товара. Наши
                            консультанты Вас проинформируют во время
                            подтверждения Вашего заказа по телефону.
                          </p>
                          <p className="py-2 font-[700]">Оплата: </p>
                          <p className="py-2">
                            Оплата за наши товары производится при получении
                            товара.
                          </p>
                          <p className="pt-8">
                            Более подробную информацию о доставке до Вашего
                            адреса можете получить позвонив по номеру
                            +992929790059 или написав на один из мессенджеров (
                            Вайбер/Вотсапп/Телеграм/IMO)
                          </p>
                        </div>
                      </TabPanel>
                    </TabContext>
                  </Box>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
