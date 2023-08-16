import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getProducts,
  getProductsBasket,
} from "../../api/products";
import { Link } from "react-router-dom";
import { setDisabled } from "../../reducers/products";

export default function Basket() {
  const getBasket = useSelector(({ products }) => products.getBasket);

  const sumPrice = getBasket.reduce((acc, curr) => acc + curr.price, 0);

  const disabled = useSelector(({ products }) => products.disabled);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsBasket());
    dispatch(getProducts());
  }, [dispatch]);

  if (getBasket.length > 0) {
    dispatch(setDisabled(false));
  } else {
    dispatch(setDisabled(true));
  }

  return (
    <div>
      <div className="container m-[0_auto]">
        <div className="w-[90%] m-auto">
          <div className="py-[45px] ">
            <div className="">
              <div>
                <p className="text-[36px] pb-[20px] text-center ">
                  Корзина покупок
                </p>

                <div>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Фотография</TableCell>
                          <TableCell>Наименование</TableCell>
                          <TableCell>Кол-во</TableCell>
                          <TableCell>Стоимость</TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {getBasket.map((el) => {
                          return (
                            <TableRow
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                <img
                                  className="w-[100px] rounded-[10px]"
                                  src={el.img}
                                  alt=""
                                />
                              </TableCell>
                              <TableCell className="w-[50%]">
                                <p>{el.title}</p>
                              </TableCell>
                              <TableCell>
                                <input
                                  min={0}
                                  max={20}
                                  type="number"
                                  className="w-[80px] p-2 border rounded-[5px]"
                                />
                              </TableCell>
                              <TableCell>{el.price} c.</TableCell>
                              <TableCell>
                                <button
                                  onClick={() => dispatch(deleteProduct(el.id))}
                                  className="text-[red] text-[30px] opacity-[0.6] hover:opacity-[1]"
                                >
                                  {" "}
                                  &times;
                                </button>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <div className="my-8 bg-[white] w-[30%] rounded shadow p-4">
                    <p className="font-[600] pb-2 text-[26px]">Сумма заказов</p>
                    <div className="flex  justify-between border p-2">
                      <p className="font-[700]">Подытог</p>
                      <p> {sumPrice} c</p>
                    </div>
                    <div className="flex justify-between border p-2">
                      <p className="font-[700]">Итого</p>
                      <p> {sumPrice} c</p>
                    </div>
                  </div>
                  <div className=" flex gap-4">
                    <Link to={"/checkout"}>
                      {disabled == false ? (
                        <button
                          disabled={disabled}
                          className="bg-[#005BFF] px-6 py-2 rounded-[15px] text-[white]  "
                        >
                          Оформление заказа
                        </button>
                      ) : (
                        <button
                          disabled={disabled}
                          className="bg-[#9d9d9d] px-6 py-2 rounded-[15px] text-[white] cursor-not-allowed"
                        >
                          Оформление заказа
                        </button>
                      )}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
