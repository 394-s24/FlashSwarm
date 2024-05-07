import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const NewSwarmForm = (/* props here */) => {
  return (
    <div className="flex flex-column justify-center">
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
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Front-end work... etc."
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="start"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Start Time
            </label>
            <TimePicker
              renderInput={(props) => (
                <input
                  {...props}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              )}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="end"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              End Time
            </label>
            <TimePicker
              renderInput={(props) => (
                <input
                  {...props}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              )}
            />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Submit
          </button>
        </form>
      </LocalizationProvider>
    </div>
  );
};

export default NewSwarmForm;
