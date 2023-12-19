import moment from "moment";

export const updateSearchParams = (
  router: any,
  searchParams: any,
  pathname: any,
  type: any,
  value: any
) => {
  const current = new URLSearchParams(Array.from(searchParams.entries()) as []);
  if (!value) {
    current.delete(type);
  } else {
    current.set(type, value);
  }
  const search = current.toString();
  const query = search ? `?${search}` : "";

  router.replace(`${pathname}${query}`);
};

export const convertTimestampToString = (timestamp: number) => {
  const currentMoment = moment();

  // Get the future moment using the future timestamp
  const futureMoment = moment(timestamp);

  const duration = moment.duration(futureMoment.diff(currentMoment));

  // Extract the days, hours, minutes, and seconds from the duration
  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();

  // Display the time difference
  let formattedDifference = "";

  if (days > 0) {
    formattedDifference += `${days} day${days > 1 ? "s" : ""}, `;
  }

  formattedDifference += `${hours} hour${
    hours > 1 ? "s" : ""
  }, ${minutes} minute${minutes > 1 ? "s" : ""}, ${seconds} second${
    seconds > 1 ? "s" : ""
  }`;

  return formattedDifference;
};

function getStatusById(id: string) {
  const statusMap = {
    1: "Pending",
    2: "Active",
    3: "Canceled",
    4: "Defeated",
    5: "Succeeded",
    6: "Queued",
    7: "Expired",
    8: "Executed",
  } as any;

  // Check if the ID exists in the map
  if (statusMap.hasOwnProperty(id)) {
    return statusMap[id];
  } else {
    return "Unknown"; // Or handle the case when the ID is not found
  }
}
