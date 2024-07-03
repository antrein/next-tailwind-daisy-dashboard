"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";

interface EventData {
  project_id: string;
  timestamp: string;
  total_users_in_queue: number;
  total_users_in_room: number;
  total_users: number;
}

export default function Home() {
  const selectedProject = Cookies.get("project");

  const [messages, setMessages] = useState<EventData[]>([]);

  useEffect(() => {
    if (selectedProject) {
      const sse = new EventSource(
        `https://api.antrein.com/bc/dashboard/analytic?project_id=${selectedProject}`
      );

      sse.onmessage = (event) => {
        console.log(event.data)
        const data: EventData = JSON.parse(event.data);
        setMessages([data]);
      };

      // sse.onerror = (err) => {
      //   console.error('EventSource failed:', err);
      //   sse.close();
      // };

      return () => {
        // sse.close();
      };
    }
  }, [selectedProject]);

  return (
    <div>
      <h1>Analytics</h1>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            {/* <p>Project ID: {message.project_id}</p> */}
            {/* <p>Timestamp: {new Date(message.timestamp).toLocaleString()}</p> */}
            <p>Total Users in Queue: {message.total_users_in_queue}</p>
            <p>Total Users in Room: {message.total_users_in_room}</p>
            <p>Total Users: {message.total_users}</p>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}
