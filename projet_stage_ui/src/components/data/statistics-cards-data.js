import {
  BanknotesIcon,
  UserPlusIcon,
  UserIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";
import { FaUsers } from 'react-icons/fa';
import { IoTicket } from 'react-icons/io5';
import { BiTransfer } from 'react-icons/bi';
export const statisticsCardsData = [
  {
    color: "blue",
    icon: FaUsers,
    title: "Client",
    value: "3",
    footer: {
      color: "text-green-500",
      value: "+20%",
      label: "que la semeine dernière",
    },
  },
  {
    color: "red",
    icon: IoTicket,
    title: "Ticket",
    value: "14",
    footer: {
      color: "text-green-500",
      value: "+3%",
      label: "que la semeine dernière",
    },
  },
  {
    color: "green",
    icon: BiTransfer,
    title: "Transfer",
    value: "7",
    footer: {
      color: "text-red-500",
      value: "-2%",
      label: "que la semeine dernière",
    },
  }/*,
  {
    color: "orange",
    icon: ChartBarIcon,
    title: "Sales",
    value: "$103,430",
    footer: {
      color: "text-green-500",
      value: "+5%",
      label: "than yesterday",
    },
  },*/
];

export default statisticsCardsData;
