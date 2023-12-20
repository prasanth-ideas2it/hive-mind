export const navItems = [
  {
    name: "Active Proposals",
    key: "active-proposals",
    url: "/",
  },
  {
    name: "Past Proposals",
    key: "past-proposals",
    url: "/past-proposals",
  },
  {
    name: "My Proposals",
    key: "my-proposals",
    url: "/my-proposals",
  },
];

export const proposals = [
  {
    name: "Organisation",
    title:
      "How satisfied are you with the current decision-making processes in the organization?",
    bgColor: "#FFD4B5",
  },
  {
    name: "rupees",
    title:
      "In the next fiscal year, what should be the top priority for IT budget allocation?",
    bgColor: "#B9EDB8",
  },
];

let colorArray = [{ name: "Organisation", bgcolor: "#FFD4B5" }];

function getBgColorByName(name: string) {
  let foundObject = colorArray.find((obj) => obj.name === name);

  // Check if the object was found
  if (foundObject) {
    return foundObject.bgcolor;
  } else {
    return "Name not found";
  }
}

// Example usage
let requestedName = "Object2";
let bgColor = getBgColorByName(requestedName);

console.log(bgColor); // Output: #00FF00
