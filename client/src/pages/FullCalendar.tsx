import React from "react";
import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { DatePicker } from "antd";
import { Input, Button} from "antd";
import randomColor from "randomcolor";
import instance from "../common/axios";

const { RangePicker } = DatePicker;

const DemoApp: React.FC = () => {
  const [events, setEvents] = useState<any>(null);
  const [day, setDay] = useState<string>("");
  const [event, setEvent] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [dateError, setDateError] = useState<string>("none");
  const [itemError, setItemError] = useState<string>("black");
  const [nameEvent, setNameInfo] = useState<string[]>([""]);
  const [id, setId] = useState<string>("");
  const [eventInfo, setEventInfo] = useState<string>("none");


  const dataToSend = {
    id: Date.now().toString(),
    title: event,
    start: day[0],
    end: day[1],
    backgroundColor: randomColor({
      luminosity: 'dark',
      format: 'rgba' 
   }),
  };
  useEffect(() => {
    instance.get("").then((response: any) => {
      setEvents(response.data);
    });
  }, []);

  const handleSend = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (event === "" || day === "") {
      setError(true);
      setItemError("red");
      setDateError("block");
    } else {
      instance({
        method: "post",
        data: dataToSend,
      });
      window.location.reload();
    }
  };

  const onChange = (value: any, dateString: any) => {
    setDay(dateString);
    console.log(day);
  };

  const handleEvent = (e: React.FormEvent<HTMLInputElement>) => {
    setEvent(e.currentTarget.value);
  };

  const mouseEnter = (data: any) => {
    const dataStart = data.event._instance.range.start.toString();
    const dataTitle = data.event._def.title;
    const dataEnd = data.event._instance.range.end.toString();
    setNameInfo([dataTitle, dataStart, dataEnd]);
    setId(data.event._def.publicId);

    if (nameEvent !== [""]) {
      setEventInfo("block");
    }
  };

  const handleEventDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    instance.delete(`/${id} `, { data: { id: id } });
    window.location.reload();
  };


  return (
    <div className="calendary_view">
      <div className="nav_calendary">
        <div className="nav_view">
          <h2>Dodaj wydarzenie</h2>
          <h3 style={{ color: itemError }}>Nazwa wydarzenia</h3>
          <Input
            onChange={handleEvent}
            value={event}
            placeholder="Nazwa wydarzenia"
          />
          <h3 style={{ color: itemError }}>Wybierz date</h3>
          <RangePicker
            showTime={{
              format: "HH:mm",
            }}
            format="YYYY-MM-DDTHH:mm"
            onChange={onChange}
          />
          <Button
            className="button_calendary"
            onClick={handleSend}
            type="primary"
          >
            Dodaj
          </Button>
          <h4 className="add_error_info" style={{ display: dateError }}>
            *Nazwa wydarzenia jest wymagana
          </h4>
          <h4 className="add_error_info" style={{ display: dateError }}>
            *Data jest wymagana
          </h4>
          <div>
            <div style={{ display: eventInfo, padding: "35px 0" }}>
              <h1>Informacje o wydarzeniu</h1>
              <h2>Nazwa wydarzenia</h2>
              <h3>{nameEvent[0]}</h3>
              <h3>Od:</h3>
              <p className="event_information">{nameEvent[1]}</p>
              <h3>Do:</h3>
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
