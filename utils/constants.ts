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
      "Have you considered potential changes in the external environment that might affect the decision?",
    bgColor: "#FFD4B5",
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
