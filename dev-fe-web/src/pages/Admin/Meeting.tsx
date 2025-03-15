import CMSLayout from "@/layouts/cms-layout";
import React, { useState } from "react";

import FullCalendar from "@fullcalendar/react"; // Import FullCalendar
import dayGridPlugin from "@fullcalendar/daygrid"; // Plugin cho chế độ xem tháng
import interactionPlugin from "@fullcalendar/interaction"; // Plugin cho tương tác (chọn ngày, sự kiện)
import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group";
import listPlugin from "@fullcalendar/list";
import "@/styles/calendar-style.css";

const events = [
  // Ngày 2025-02-05 (Thứ Tư)
  {
    title: "Đặt phòng A",
    start: "2025-02-05T09:00:00",
    end: "2025-02-05T10:00:00",
  },
  {
    title: "Đặt phòng B",
    start: "2025-02-05T11:00:00",
    end: "2025-02-05T12:00:00",
  },
  {
    title: "Đặt phòng C",
    start: "2025-02-05T13:00:00",
    end: "2025-02-05T14:00:00",
  },
  {
    title: "Đặt phòng D",
    start: "2025-02-05T15:00:00",
    end: "2025-02-05T16:00:00",
  },
  {
    title: "Đặt phòng A1",
    start: "2025-02-06T09:00:00",
    end: "2025-02-06T10:00:00",
  },
  {
    title: "Đặt phòng B1",
    start: "2025-02-06T11:00:00",
    end: "2025-02-06T12:00:00",
  },
  {
    title: "Đặt phòng C1",
    start: "2025-02-06T13:00:00",
    end: "2025-02-06T14:00:00",
  },

  // Ngày 2025-02-12 (Thứ Tư)
  {
    title: "Đặt phòng E",
    start: "2025-02-12T09:00:00",
    end: "2025-02-12T10:00:00",
  },
  {
    title: "Đặt phòng F",
    start: "2025-02-12T11:00:00",
    end: "2025-02-12T12:00:00",
  },
  {
    title: "Đặt phòng G",
    start: "2025-02-12T13:00:00",
    end: "2025-02-12T14:00:00",
  },
  {
    title: "Đặt phòng H",
    start: "2025-02-12T15:00:00",
    end: "2025-02-12T16:00:00",
  },

  // Ngày 2025-02-19 (Thứ Tư)
  {
    title: "Đặt phòng I",
    start: "2025-02-19T09:00:00",
    end: "2025-02-19T10:00:00",
  },
  {
    title: "Đặt phòng J",
    start: "2025-02-19T11:00:00",
    end: "2025-02-19T12:00:00",
  },
  {
    title: "Đặt phòng K",
    start: "2025-02-19T13:00:00",
    end: "2025-02-19T14:00:00",
  },
  {
    title: "Đặt phòng L",
    start: "2025-02-19T15:00:00",
    end: "2025-02-19T16:00:00",
  },

  // Ngày 2025-02-26 (Thứ Tư)
  {
    title: "Đặt phòng M",
    start: "2025-02-26T09:00:00",
    end: "2025-02-26T10:00:00",
  },
  {
    title: "Đặt phòng N",
    start: "2025-02-26T11:00:00",
    end: "2025-02-26T12:00:00",
  },
  {
    title: "Đặt phòng O",
    start: "2025-02-26T13:00:00",
    end: "2025-02-26T14:00:00",
  },
  {
    title: "Đặt phòng P",
    start: "2025-02-26T15:00:00",
    end: "2025-02-26T16:00:00",
  },

  // Ngày 2025-03-05 (Thứ Tư)
  {
    title: "Đặt phòng Q",
    start: "2025-03-05T09:00:00",
    end: "2025-03-05T10:00:00",
  },
  {
    title: "Đặt phòng R",
    start: "2025-03-05T11:00:00",
    end: "2025-03-05T12:00:00",
  },
  {
    title: "Đặt phòng S",
    start: "2025-03-05T13:00:00",
    end: "2025-03-05T14:00:00",
  },
  {
    title: "Đặt phòng T",
    start: "2025-03-05T15:00:00",
    end: "2025-03-05T16:00:00",
  },

  // Ngày 2025-03-12 (Thứ Tư)
  {
    title: "Đặt phòng U",
    start: "2025-03-12T09:00:00",
    end: "2025-03-12T10:00:00",
  },
  {
    title: "Đặt phòng V",
    start: "2025-03-12T11:00:00",
    end: "2025-03-12T12:00:00",
  },
  {
    title: "Đặt phòng W",
    start: "2025-03-12T13:00:00",
    end: "2025-03-12T14:00:00",
  },
  {
    title: "Đặt phòng X",
    start: "2025-03-12T15:00:00",
    end: "2025-03-12T16:00:00",
  },

  // Ngày 2025-03-19 (Thứ Tư)
  {
    title: "Đặt phòng Y",
    start: "2025-03-19T09:00:00",
    end: "2025-03-19T10:00:00",
  },
  {
    title: "Đặt phòng Z",
    start: "2025-03-19T11:00:00",
    end: "2025-03-19T12:00:00",
  },
  {
    title: "Đặt phòng AA",
    start: "2025-03-19T13:00:00",
    end: "2025-03-19T14:00:00",
  },
  {
    title: "Đặt phòng AB",
    start: "2025-03-19T15:00:00",
    end: "2025-03-19T16:00:00",
  },

  // Ngày 2025-03-26 (Thứ Tư)
  {
    title: "Đặt phòng AC",
    start: "2025-03-26T09:00:00",
    end: "2025-03-26T10:00:00",
  },
  {
    title: "Đặt phòng AD",
    start: "2025-03-26T11:00:00",
    end: "2025-03-26T12:00:00",
  },
  {
    title: "Đặt phòng AE",
    start: "2025-03-26T13:00:00",
    end: "2025-03-26T14:00:00",
  },
  {
    title: "Đặt phòng AF",
    start: "2025-03-26T15:00:00",
    end: "2025-03-26T16:00:00",
  },
];

const Meeting: React.FC = () => {
  const [viewMode, setViewMode] = useState<"dayGridMonth" | "listWeek">(
    "dayGridMonth"
  );

  return (
    <CMSLayout>
      <div style={{ flex: 0.9 }}>
        <ToggleGroup
          type="single"
          value={viewMode}
          onValueChange={(value) =>
            value && setViewMode(value as "dayGridMonth" | "listWeek")
          }
        >
          <ToggleGroupItem className="bg-transparent" value="dayGridMonth">
            Tháng
          </ToggleGroupItem>
          <ToggleGroupItem className="bg-transparent" value="listWeek">
            Tuần
          </ToggleGroupItem>
        </ToggleGroup>
        <FullCalendar
          locale="vi"
          plugins={[dayGridPlugin, listPlugin, interactionPlugin]}
          initialView={viewMode}
          eventTextColor="white" // Màu chữ trắng
          eventBackgroundColor="#ff5733" // Màu nền đỏ cam
          key={viewMode}
          events={events}
          eventClick={(info) => {
            alert(`Sự kiện: ${info.event.title}`);
          }}
          dateClick={(info) => {
            alert(`Ngày chọn: ${info.dateStr}`);
          }}
          height="100%"
          buttonText={{
            today: "Hôm nay" 
          }}
        />
      </div>
    </CMSLayout>
  );
};

export default Meeting;
