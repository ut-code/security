import { writable } from "svelte/store";

type User = {
  name: string;
  password: string;
};
export const users: User[] = [
  {
    name: "ASP.NET",
    password: "agda",
  },
  {
    name: "Bootstrap",
    password: "bcry",
  },
  {
    name: "Django",
    password: "dddd",
  },
  {
    name: "Ecma",
    password: "javascript",
  },
  {
    name: "Firefox",
    password: "mdn",
  },
];

export const messages = writable([
  {
    id: 1,
    text: "Hey there!",
    sender: "other",
    timestamp: new Date(Date.now() - 300000),
  },
  {
    id: 2,
    text: "Hi! How are you?",
    sender: "user",
    timestamp: new Date(Date.now() - 240000),
  },
  {
    id: 3,
    text: "I'm doing great, thanks for asking!",
    sender: "other",
    timestamp: new Date(Date.now() - 180000),
  },
  {
    id: 4,
    text: "That's wonderful to hear! Do you have any plans for the weekend?",
    sender: "user",
    timestamp: new Date(Date.now() - 120000),
  },
  {
    id: 5,
    text: "Yes, I'm planning to go hiking. How about you?",
    sender: "other",
    timestamp: new Date(Date.now() - 60000),
  },
]);
