import { getSwarms } from "../../../utils/DatabaseFunc";

const SwarmLog = () => {
  // console.log(getSwarms("coral"));
  const [data, error] = getSwarms("coral");
  if (data === undefined) {
    return <h1>loading data</h1>;
  }

  const formatDate = (date) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const suffix =
      day % 10 === 1 && day !== 11
        ? "st"
        : day % 10 === 2 && day !== 12
          ? "nd"
          : day % 10 === 3 && day !== 13
            ? "rd"
            : "th";
    const hours = date.getHours();
    const ampm = hours >= 12 ? "pm" : "am";
    const formattedHour = hours % 12 || 12; // Convert 24h to 12h format and handle midnight as 12

    return `${month} ${day}${suffix}, ${formattedHour} ${ampm}`;
  };

  return (
    <div class="flex-col items-center justify-center m-10 text-sm font-medium text-gray-900 ">
      <h1>Swarm Log</h1>
      <div class="overflow-y-auto max-h-96">
        {Object.values(data).map((e) => {
          return (
            <div key={e.id} class="p-3 m-2 border rounded-md">
              <h1>Swarm Description: {e.description}</h1>
              <h2>Start: {formatDate(new Date(e.startTime))}</h2>
              <h2>End: {formatDate(new Date(e.endTime))}</h2>
              <h2>Participants:</h2>
              {e.usernames &&
                Object.values(e.usernames).map((username) => {
                  return (
                    <h3 key={username} class="ml-2">
                      @{username}
                    </h3>
                  );
                })}
              {!e.usernames && <h3 class="ml-2">No participants yet</h3>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SwarmLog;
