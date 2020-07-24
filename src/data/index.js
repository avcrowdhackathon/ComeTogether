export const Role = {
  admin: {
    name: ["admin"],
    inherits: ["user", "health", "verifier"],
  },
  user: {
    name: ["user"],
    inherits: [],
  },
  health: {
    name: ["health"],
    inherits: ["user"],
  },
  verifier: {
    name: ["verifier"],
    inherits: ["user"],
  },
};

export const Types = [
  {
    label: "COVID-19 Test",
    value: "type1",
    checkBoxes: [
      {
        label: "COVID-19",
        value: 0,
      },
    ],
  },
  {
    label: "Antibody Test",
    value: "type2",
    checkBoxes: [
      {
        label: "Antibodies",
        value: 0,
      },
    ],
  },
  {
    label: "COVID-19 & Antibody Test",
    value: "type3",
    checkBoxes: [
      {
        label: "COVID-19",
        value: 0,
      },
      {
        label: "Antibodies",
        value: 0,
      },
    ],
  },
];

export const DropdownRoles = [
  {
    label: "Admin",
    value: 0,
  },
  {
    label: "User",
    value: 1,
  },
  {
    label: "Health",
    value: 2,
  },
  {
    label: "Verifier",
    value: 3,
  },
];
