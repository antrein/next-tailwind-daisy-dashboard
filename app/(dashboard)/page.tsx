"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { UsersInQueueChart } from "@/components/charts/UsersInQueueChart";

interface EventData {
  project_id: string;
  timestamp: string;
  total_users_in_queue: number;
  total_users_in_room: number;
  total_users: number;
}

interface ChartData {
  time: string;
  value: number;
}

export default function Home() {
  const selectedProject = Cookies.get("project");

  const [messages, setMessages] = useState<EventData[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    if (selectedProject) {
      const sse = new EventSource(
        `https://api.antrein.com/bc/dashboard/analytic?project_id=${selectedProject}`
      );

      sse.onmessage = (event) => {
        const data: EventData = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, data]);

        const newChartData = {
          time: new Date(data.timestamp).toLocaleTimeString(),
          value: data.total_users_in_queue,
        };

        setChartData((prevChartData) => {
          const updatedChartData = [...prevChartData, newChartData];
          return updatedChartData.length > 10
            ? updatedChartData.slice(updatedChartData.length - 10)
            : updatedChartData;
        });
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
    <div className="flex w-full px-8">
      {/* <h1>Analytics</h1>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            <p>Total Users in Queue: {message.total_users_in_queue}</p>
            <p>Total Users in Room: {message.total_users_in_room}</p>
            <p>Total Users: {message.total_users}</p>
            <hr />
          </li>
        ))}
      </ul> */}
      <UsersInQueueChart data={chartData} />
    </div>
  );
}
