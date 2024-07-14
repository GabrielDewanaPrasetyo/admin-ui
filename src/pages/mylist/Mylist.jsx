import "./mylist.scss"
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Mydatatable from "../../components/mydatatable/Mydatatable";
import Widget from "../../components/widget/Widget";


const Mylist = () => {
  return (
    <div className="mylist">
      <Sidebar />
      <div className="mylistContainer">
        <Navbar />
        <div className="widgets">
        <Widget type="user"/>
        <Widget type="order"/>
        <Widget type="earning"/>
      </div>
      <div className="table">
      <Mydatatable columns={"All Data"}/>
        </div>
      </div>
    </div>
  )
}

export default Mylist