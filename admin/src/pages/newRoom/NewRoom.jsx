import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const NewRoom = () => {
  const [info, setinfo] = useState({});
  const [hotelId, sethotelId] = useState(undefined);
  const [rooms, setrooms] = useState([]);
  const { data, error, Loading } = useFetch("/hotel");

  const handleChange = (e) => {
    setinfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleCLick = async (e) => {
    e.preventDefault();
    const roomNumbers = rooms.split(",").map((room) => ({ number: room }));
    console.log(roomNumbers);
    try {
      await axios.post(`http://localhost:8000/api/room/createroom/${hotelId}`, {
        ...info,
        roomNumbers,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Room</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className="formInput room">
                <label>Rooms</label>
                <textarea
                  onChange={(e) => setrooms(e.target.value)}
                  placeholder="give comma between rooms"
                ></textarea>
              </div>
              <div className="formInput">
                <label>Choose Hotel</label>
                <select
                  id={hotelId}
                  onChange={(e) => sethotelId(e.target.value)}
                >
                  {Loading
                    ? "Loading"
                    : data &&
                      data.map((hotel) => (
                        <option key="hotel._id" value={hotel._id}>
                          {hotel.name}\
                        </option>
                      ))}
                </select>
              </div>
              <button className="btn btn-primary" onClick={handleCLick}>
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
