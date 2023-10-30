import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { searchContext } from "../../context/SearchContext";
import useFetch from "../../hooks/useFetch";
import "./Reserve.css";

function Reserve({ setOpen, hotelId }) {
  const [selectedRooms, setselectedRooms] = useState([]);
  const { data, Loading, error } = useFetch(`/hotel/rooms/${hotelId}`);
  const navigate = useNavigate();
  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
 
    setselectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };
  console.log(selectedRooms, "hey kkkkkkkkkkk");
  console.log(data, "ooooooooooooo");
  const { dates } = useContext(searchContext);
  const dateInRange = (start, end) => {
    const date = new Date(start.getTime());
    let dates = [];
    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };
  const allDates = dateInRange(dates[0].startDate, dates[0].endDate);
  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      allDates.includes(new Date(date).getTime())
    );
    return !isFound;
  };
  const handleClick = async (e) => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(
            `http://localhost:8000/api/room/Availabilityupdate/${roomId}`,
            {
              dates: allDates,
            }
          );
          return res.data;
        })
      );
      setOpen(false);
      navigate("/");
    } catch (error) {}
  };
  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select Your Rooms :</span>
        {data.map((item) => (
          <div className="rItem">
            <div className="rItemInfo">
              <div className="rTitle">{item?.title}</div>
              <div className="rDesc">{item?.desc}</div>
              <div className="rMAx">
                Max People:<b>{item?.maxpeople}</b>
              </div>
              <div className="rprice">Price:{item?.price}</div>
            </div>
            <span>Room Numbers:</span>
            <div className="rSelectRooms">
              {item.roomNumbers.map((roomNumber) => (
                <div className="room">
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  ></input>
                </div>
              ))}
            </div>
          </div>
        ))}

        <button onClick={handleClick} className="rbutton btn btn-primary">
          {" "}
          Reserve Now
        </button>
      </div>
    </div>
  );
}

export default Reserve;
