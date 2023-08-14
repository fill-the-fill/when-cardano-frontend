/*
 *
 * When Cardano Calendar Database
 *
 * When Cardano Calendar should be a place where one can come to see
 * Community events, meetups, workshops, hard forks and  other event-based things.
 * Open for everyone to use.
 *
 * INSTRUCTIONS:
 * - Add your event in the JSON array below.
 * - Please make sure your event has a unique ID
 * - Please use ISO 8601 format for event start/end
 * - For tags, please check Tag.js file to find fitting tags. (You can add more than one tag)
 */

export const Database = [
  {
    id: "1",
    title: "Meetup 2023",
    location: "virtual",
    description: "Meetup in Estonia",
    start: "2023-08-29T14:30:00",
    end: "2023-08-29T16:30:00",
    tags: ["meetups"],
  },
  {
    id: "2",
    title: "Twitter Event",
    location: "virtual",
    description: "Twitter space with Fred",
    start: "2023-08-27T17:30:00",
    end: "2023-08-28T18:30:00",
    tags: ["twitterSpace"],
  },
  {
    id: "3",
    title: "Protocol Event",
    location: "local",
    description: "Protocol V3",
    start: "2023-08-25T17:30:00",
    end: "2023-08-25T18:30:00",
    tags: ["protocol"],
  },
  {
    id: "4",
    title: "dcSpark Event Protocol",
    location: "local",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typeset.",
    start: "2023-08-24T17:30:00",
    end: "2023-08-24T18:30:00",
    tags: ["dcSpark", "protocol"],
  },
  {
    id: "5",
    title: "IOG Call",
    location: "virtual",
    description: "IOG call - hard fork discussion",
    start: "2023-08-22T17:30:00",
    end: "2023-08-22T18:30:00",
    tags: ["iog"],
  },
  {
    id: "6",
    title: "Strica meetup",
    location: "virtual",
    description: "Strica meetup in Japan",
    start: "2023-08-12T05:20:00.000Z",
    end: "2023-08-14T11:20:00.000Z",
    tags: ["strica", "meetups"],
  },
  {
    id: "7",
    title: "Summit 2023",
    location: "virtual",
    description: "This is a summit event that will happen in Dubai",
    start: "2023-08-07T05:20:00.000Z",
    end: "2023-08-07T11:20:00.000Z",
    tags: ["meetups", "cf"],
  },
  {
    id: "8",
    title: "Emurgo party",
    location: "virtual",
    description: "This is an Emurgo party event",
    start: "2023-08-05T05:20:00.000Z",
    end: "2023-08-06T11:20:00.000Z",
    tags: ["meetups", "emurgo"],
  },
];
