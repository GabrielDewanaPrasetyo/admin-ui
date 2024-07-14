import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowUp";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

// eslint-disable-next-line react/prop-types
const Widget = ({ type }) => {
  let data;

  //temporary
  const [amount, setAmount] = useState(null)
  const [diff, setDiff] = useState(null)

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        query:"users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "Products",
        isMoney: false,
        link: "View all products",
        query:"products",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "Categories",
        isMoney: false,
        link: "View all categories",
        query:"categories",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    default:
      break;
  }

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date();
      const lastMonth = new Date(new Date().setMonth(today.getMonth() - 1));
      const prevMonth = new Date(new Date().setMonth(today.getMonth() - 2));

      const lastMonthQuery = query(
        collection(db, data.query),
        where("timeStamp", "<=", today),
        where("timeStamp", ">", lastMonth)
      );
      const prevMonthQuery = query(
        collection(db, data.query),
        where("timeStamp", "<=", lastMonth),
        where("timeStamp", ">", prevMonth)
      );

      const lastMonthData = await getDocs(lastMonthQuery);
      const prevMonthData = await getDocs(prevMonthQuery); 

      setAmount(lastMonthData.docs.length);
      setDiff(100);

      if(prevMonthData.docs.length > 0){
        setDiff(
          ((lastMonthData.docs.length - prevMonthData.docs.length) / prevMonthData.docs.length) *
            100
        );
      } 
    };
    fetchData();
  }, []);

  return (
    <div className="widget">
      <div className="left">
        <div className="title">{data.title}</div>
        <div className="counter">
          {data.isMoney && "$"} {amount}
        </div>
        <div className="link">{data.link}</div>
      </div>
      <div className="right">
  <div className={`percentage ${diff < 0 ? "negative" : "positive"}`}>
    {diff < 0 ? <KeyboardArrowDownIcon/> : <KeyboardArrowUpIcon/> }
    {diff} %
  </div>
  {data.icon}
</div>
    </div>
  );
};

export default Widget;