import { useState } from "react";
import dayjs from "dayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { createSwarm } from "../../utils/DatabaseFuncs";

const NewSwarmForm = () => {
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [startTime, setStartTime] = useState(dayjs());
  const [endTime, setEndTime] = useState(dayjs());

  const handleSubmit = (e) => {
    e.preventDefault();
    createSwarm("coral", {
      description,
      link,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
    });
    setDescription("");
    setLink("");
    setStartTime(new Date());
    setEndTime(new Date());
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form className="max-w-lg mx-auto">
          <div className="mb-5">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Swarm Description
            </label>
            <textarea
              rows="4"
              id="description"
              value={description}
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Front-end work... etc."
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="Link"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Link
            </label>
            <input
              id="Link"
              value={link}
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Link for Zoom, VSCode Liveshare, etc."
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
          <div className="mb-5 flex">
            <div className="">
              <label
                htmlFor="start"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Start Time
              </label>
              <TimePicker defaultValue={dayjs()} onChange={(newValue) => setStartTime(newValue)} />
            </div>
            <div className="ml-2">
              <label
                htmlFor="end"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                End Time
              </label>
              <TimePicker defaultValue={dayjs()} onChange={(newValue) => setEndTime(newValue)} />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </LocalizationProvider>
    </div>
  );
};

export default NewSwarmForm;
