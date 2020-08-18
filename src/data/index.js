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
    value: "RT-PCR",
    checkBoxes: [
      {
        label: "RT-PCR",
        value: 0,
      },
    ],
  },
  {
    label: "Rapid RT-PCR",
    value: "Rapid RT-PCR",
    checkBoxes: [
      {
        label: "Rapid RT-PCR",
        value: 0,
      },
    ],
  },
  {
    label: "Antibody Test",
    value: "Antibody Test",
    checkBoxes: [
      {
        label: "Antibodies",
        value: 0,
      },
    ],
  },
  {
    label: "Rapid Antibody Test",
    value: "Rapid Antibody Test",
    checkBoxes: [
      {
        label: "Rapid Antibodies",
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
