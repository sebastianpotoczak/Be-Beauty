import React from "react";
import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { DatePicker } from "antd";
import { Input, Button } from "antd";
import randomColor from "randomcolor";
import instance from "../common/axios";
import { Checkbox, Divider } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import { useHistory } from "react-router-dom";
const jwt = require('jsonwebtoken')
const CheckboxGroup = Checkbox.Group;

const plainOptions = [" Malowanie", " Regulacja brwi", " Henna"];
const defaultCheckedList = [""];

const DemoApp: React.FC = () => {
  const [events, setEvents] = useState<any>(null);
  const [day, setDay] = useState<string>("");
  const [event, setEvent] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [dateError, setDateError] = useState<string>("none");
  const [itemError, setItemError] = useState<string>("black");
  const [nameEvent, setNameInfo] = useState([""]);
  const [id, setId] = useState<string>("");
  const [eventInfo, setEventInfo] = useState<string>("none");
  const [checkedList, setCheckedList] =
    useState<CheckboxValueType[]>(defaultCheckedList);
  const [indeterminate, setIndeterminate] = useState(true);
  const [adminCheck ,setAdminCheck] = useState("none")
  const [infoError, setInfoError] = useState('none');
  const onChanges = (list: CheckboxValueType[]) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    console.log(checkedList)
  };
  const token = localStorage.getItem("token");
  const decoded = jwt.verify(token, "secret123");
  const phoneToken = localStorage.getItem("phoneToken");
  const decodedPhone = jwt.verify(phoneToken, "secret123");
  const phone = decodedPhone.phones;
  const nameDecoded = decoded.name;
  const getSurname = localStorage.getItem("surnameToken");
  const getAdmin = localStorage.getItem("admin");
  const adminToken = jwt.verify(getAdmin, "secret123");
  const admin = adminToken.admin;
  const surnameToken = jwt.verify(getSurname, "secret123");
  const surname = surnameToken.surname;

  const history = useHistory()

 console.log(typeof admin)

  const dataToSend = {
    id: Date.now().toString(),
    title: [nameDecoded,surname,phone],
    start: day,
    info: checkedList,
    backgroundColor: randomColor({
      luminosity: "dark",
      format: "rgba",
    }),
  };
  useEffect(() => {
    instance.get("").then((response: any) => {
      setEvents(response.data);
    });
  }, []);

  const handleSend = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (event === "" || day === "" ) {
      setError(true);
      setItemError("red");
      setDateError("block");
      return
    }else if(checkedList === defaultCheckedList || checkedList.length === 0){
      setInfoError('block')
      setError(false)
      setDateError("none")
      return
    }else {
      setInfoError('none')
      instance({
        method: "post",
        data: dataToSend,
      });
      window.location.reload();
    }
  };

  const onChange = (value: any, dateString: any) => {
    setDay(dateString);
    };

  const mouseEnter = (data: any) => {
    const dataStart = data.event._instance.range.start.toString();
    const dataTitle = data.event._def.title;
    const info = data.event._def.extendedProps.info.toString();
    setNameInfo([dataTitle, dataStart, info]);
    setId(data.event._def.publicId);
      setEventInfo("block");
      if(admin === "true"){
        setAdminCheck("block")
      }
  };

  const handleEventDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    instance.delete(`/${id} `, { data: { id: id } });
    window.location.reload();
  };
  const logout = () => {
    localStorage.clear();
    history.push("/login")
  }
  return (
    <div className="calendary_view">
      <div className="nav_calendary">
        <div className="nav_view">
          <h2>Ustal wizytę</h2>
          <h3>Dane</h3>
          <h3>Imię: {nameDecoded}</h3>
          <h3>Nazwisko: {surname}</h3>
          <h3>Telefon: {phone}</h3>
          <div style={{display: adminCheck}}>
          <h3>SIUUUUUU</h3>
          </div>
          <h3>Admin: {admin}</h3>
          <Button
            className="button_calendary"
            onClick={logout}
            type="primary"
          >
            Wyloguj
          </Button>
          <h3 style={{ color: itemError }}>Wybierz date</h3>
          <DatePicker 
              onChange={onChange}
              showTime={{
                format: "HH:mm",
              }}
              format="YYYY-MM-DDTHH:mm"
    
          />
          <div className="checkbox_add">
            <Divider />
            <CheckboxGroup
              options={plainOptions}
              value={checkedList}
              onChange={onChanges}
            />

          </div>
          <Button
            className="button_calendary"
            onClick={handleSend}
            type="primary"
          >
            Dodaj
          </Button>
          <h4 className="add_error_info" style={{ display: dateError }}>
            *Data jest wymagana
          </h4>
          <h4 className="add_error_info" style={{display: infoError}}>*Musisz wybrać chociaż jedną usługę</h4>
          <div>
            <div style={{ display: eventInfo, padding: "35px 0" }}>
              <h1>Informacje o wizycie</h1>
              <h2>Nazwa wydarzenia</h2>
              <h3>{nameEvent[0]}</h3>
              <h3>Data</h3>
              <p className="event_information">{nameEvent[1]}</p>
              <h3>Wybrane usługi</h3>
              <p className="event_information">{nameEvent[2]}</p>
              <Button
                style={{ width: "150px" }}
                type="primary"
                onClick={handleEventDelete}
              >
                Usuń
              </Button>
              <p style={{ color: "red", padding: "10px 0" }}>
                *usunięcie bedzie nieodwracalne
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="calendary_size">
        <FullCalendar
          themeSystem="bootstrap5"
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          weekends={false}
          events={events}
          initialView="dayGridMonth"
          dayMaxEventRows={true}
          eventClick={mouseEnter}
        />
      </div>
    </div>
  );
};
export default DemoApp;
