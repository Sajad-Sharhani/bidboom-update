export default [
  { id: "0", description: "code is invalid" },
  { id: "1", description: "failed finding user" },
  { id: "2", description: "failed making user" },
  { id: "3", description: "failed making token" },
  { id: "4", description: "failed sending email" },
  { id: "5", description: "no such user" },
  { id: "6", description: "failed updating user" },
  { id: "7", description: "user is not Ambassador" },
  { id: "8", description: "failed finding user from google oauth" },
  { id: "9", description: "user is not an Ambassador" },
  { id: "10", description: "user is not an User" },
  { id: "11", description: "user is not an SuperAdmin" },
  {
    id: "12",
    description: "failed sending notification (failed creating in db)",
  },
  { id: "13", description: "failed finding notifs" },
  { id: "14", description: "failed creating path" },
  { id: "15", description: "failed updating path" },
  { id: "16", description: "failed deleting path" },
  { id: "17", description: "failed finding path" },
  { id: "18", description: "failed finding paths" },
  { id: "19", description: "you should be signed in" },
  { id: "20", description: "failed clearing challenges" },
  { id: "21", description: "failed creating challenge" },
  { id: "22", description: "failed finding challenge" },
  { id: "23", description: "already answered" },
  {
    id: "24",
    description:
      "disable (isActive = false) the current challenge now, then create new one",
  },
  { id: "25", description: "ambassador is not activated" },
] as const;
