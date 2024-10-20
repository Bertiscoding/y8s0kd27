module.exports = {
  otherComments: [
    {
      id: 1,
      text: "The system helps both laymen and experienced craftsmen to create systematic project planning for an optimal planning basis.",
      authorFirstName: "Max",
      authorLastName: "Mustermann",
      authorId: 1,
      edited: false,
      createdOn: new Date(new Date().setDate(new Date().getDate() - (10 * 7))).toISOString(),
      replies: []
    },
    {
      id: 2,
      text: "autarc is a software application that digitizes data collection and calculation and then automatically generates a report.",
      authorFirstName: "Erika",
      authorLastName: "Mustermann",
      authorId: 2,
      edited: true,
      createdOn: new Date(new Date().setDate(new Date().getDate() - (2 * 7))).toISOString(),
      replies: [
        {
          id: 4,
          text: "The AUTARC software supports room-by-room heating load with the simplified procedure in accordance with DIN EN 12831, testing of heating surfaces (radiators and floor heating) for the suitability of efficient operation of a heat pump.",
          authorFirstName: "Max",
          authorLastName: "Mustermann",
          authorId: 1,
          edited: false,
          createdOn: new Date(new Date().setDate(new Date().getDate() - (1 * 7))).toISOString(),
        },
      ]
    },
    {
      id: 3,
      text: "As part of a heat load calculation, the energy required for a heating system to sufficiently heat a building is determined.",
      authorFirstName: "Max",
      authorLastName: "Mustermann",
      authorId: 1,
      edited: false,
      createdOn: new Date(new Date().setDate(new Date().getDate() - (31 * 7))).toISOString(),
      replies: []
    },
  ]
}
