export const tree_data = {
    id1: {
      text: "Office Map",
      state: {
        checked: false,
        indeterminate: false,
        draggable: true,
        dropable: false
      },
    },
    id2: {
      text: "New Employee Onboarding",
      children: ["id21", "id22"],
    },
    id21: {
      text: "Onboarding Materials",
    },
    id22: {
      text: "Training",
      children: [],
    },
    id3: {
      text: "Office Events",
      children: ["id31", "id32"],
    },
    id31: {
        text: "2018",
        children: ["id311", "id312", "id313"],
    },
    id311: {
        text: "Summer Picnic",
    },
    id312: {
        text: "Valentines Day Party",
    },
    id313: {
        text: "New Year Party",
    },
    id32: {
        text: "2017",
        children: ["id321"],
    },
    id321: {
        text: "Company Anniversary Celebration",
    },
    id4: {
        text: "Public Holidays"
    },
    id5: {
        text: "Vacation and Sick Leaves"
    }
  };