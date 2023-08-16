import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, postProductsOrders } from "../../api/products";
import { setName, setPhone } from "../../reducers/products";
import { useNavigate } from "react-router-dom";

import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Checkout() {
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const orders = useSelector(({ products }) => products.getBasket);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const name = useSelector(({ products }) => products.name);
  const phone = useSelector(({ products }) => products.phone);

  function handleOrders() {
    if (name.trim().length == 0 || phone.trim().length == 0) {
      alert("Fill out this form!");
      return;
    } else {
      dispatch(postProductsOrders(orders));
    }

    setOpen(true);
    setTimeout(() => {
      navigate("/");
    }, "2000");
    dispatch(setName(""));
    dispatch(setPhone(""));
  }

  return (
    <div className=" container m-[0_auto]">
      <div className="w-[90%] m-auto">
        <div className="bg-[white] mt-10 rounded-[20px]">
          <div>
            <Stack spacing={2} sx={{ width: "100%" }}>
              <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
              >
                <Alert
                  onClose={handleClose}
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  Your order has been accepted!
                </Alert>
              </Snackbar>
            </Stack>
          </div>
          <div className=" my-10  p-8 w-[60%] m-auto">
            <p className="text-[40px] font-[700]">Оформление заказа</p>
            <div>
              <p className="py-4 text-[25px] font-[600]">Детали оплаты</p>
              <div className="flex gap-4 w-[100%]">
                <div>
                  <p className="font-[600] py-1">Имя</p>
                  <input
                    value={name}
                    onChange={(e) => dispatch(setName(e.target.value))}
                    type="text"
                    className="border p-2 w-[370px]  rounded-[6px]"
                  />
                </div>
                <div>
                  <p className="font-[600] py-1">Фамилия </p>
                  <input
                    type="text"
                    className="border w-[370px] p-2 rounded-[6px]"
                  />
                </div>
              </div>
              <div className="py-2">
                <p className="font-[600] py-1">
                  Название компании (необязательно){" "}
                </p>
                <input
                  type="text"
                  className="border w-[100%] p-2 rounded-[6px]"
                />
              </div>
              <p className="font-[600] py-1">Страна/регион</p>
              <p className="font-[600] py-1">Таджикистан</p>
              <div className="py-2">
                <p className="font-[600] py-1">Адрес </p>
                <input
                  placeholder="Номер дома и название улицы"
                  type="text"
                  className="border w-[100%] p-2 rounded-[6px]"
                />
              </div>
              <div className="py-2">
                <p className="font-[600] py-1">Населённый пункт </p>
                <input
                  type="text"
                  className="border w-[100%] p-2 rounded-[6px]"
                />
              </div>
              <div className="py-2">
                <p className="font-[600] py-1">Область / район </p>
                <input
                  type="text"
                  className="border w-[100%] p-2 rounded-[6px]"
                />
              </div>
              <div className="py-2">
                <p className="font-[600] py-1">Телефон </p>
                <input
                  value={phone}
                  onChange={(e) => dispatch(setPhone(e.target.value))}
                  type="text"
                  className="border w-[100%] p-2 rounded-[6px]"
                />
              </div>
              <div className="py-2">
                <p className="font-[600] py-1">Email </p>
                <input
                  type="text"
                  className="border w-[100%] p-2 rounded-[6px]"
                />
              </div>

              <div className="bg-[#eee] p-4 rounded-[6px]">
                <p className="font-[600]">Оплата при доставке</p>
                <p className="py-2">Оплата наличными при доставке заказа.</p>
              </div>
              <p
                onClick={() => handleOrders()}
                className="bg-[blue] text-[white] my-4 p-2 text-center rounded-[6px] cursor-pointer text-[18px]"
              >
                Подтвердить заказ
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
