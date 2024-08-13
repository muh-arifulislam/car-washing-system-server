import dayjs from "dayjs";

const minutesToHour = (minutes: number) => {
  return dayjs().startOf("day").add(minutes, "minute").format("HH:mm");
};

export default minutesToHour;
