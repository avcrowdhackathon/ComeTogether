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
    label: "RT-PCR",
    value: "type1",
    checkBoxes: [
      {
        label: "RT-PCR",
        value: 0,
      },
    ],
  },
  {
    label: "Fast RT-PCR",
    value: "type2",
    checkBoxes: [
      {
        label: "RT-PCR",
        value: 0,
      },
    ],
  },
  {
    label: "Antibody Test",
    value: "type3",
    checkBoxes: [
      {
        label: "Antibodies",
        value: 0,
      },
    ],
  },
  {
    label: "Fast Antibody Test",
    value: "type4",
    checkBoxes: [
      {
        label: "Antibodies",
        value: 0,
      },
    ],
  },
];

export const DropdownRoles = [
  {
    label: "User",
    value: 0,
  },
  {
    label: "Health",
    value: 1,
  },
];
