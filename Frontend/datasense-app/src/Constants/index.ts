import { faMagicWandSparkles, faHistory, faDatabase, faCalendarAlt, faChartLine, faInfoCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle, faExclamationTriangle, faRobot, faUserFriends, faFileAlt, faFileImport } from '@fortawesome/free-solid-svg-icons';
export const menuItems = [
    { icon: faMagicWandSparkles, text: "Generate", url: '/dashboard/generate' },
    { icon: faHistory, text: "Activity Logs", url: '/dashboard/activity' },
    { icon: faDatabase, text: "Data Sources", url: '/dashboard/data' },
    { icon: faCalendarAlt, text: "Calendar", url: '/dashboard/calendar' },
    { icon: faChartLine, text: "Visualizations", url: '/dashboard/visualizations' },
    { icon: faInfoCircle, text: "Help", url: '/dashboard/help' },
   /* { icon: faSignOutAlt, text: "Logout", url: '/' },*/ 
];

export const navItems = [
    {text: "Home", link: '/home'},
    {text: "Generate", link: '/generate'},
    {text: "Dashboard", link: '/dashboard'},
]

export const ACCESS_TOKEN= ""
export const REFRESH_TOKEN = ""

 export const features = [
    {
      title: "Data Type Validation",
      description: "Automatically verify the data types of each column in your dataset, helping you maintain consistency and avoid potential issues during analysis.",
      icon: faCheckCircle,
    },
    {
      title: "Error Detection",
      description: "Quickly identify errors in your datasets, including null values, outliers, and incorrect categorical values, helping you ensure that your data is clean and reliable.",
      icon: faExclamationTriangle,
    },
    {
      title: " AI-Powered Suggestions",
      description: "Leverage AI to receive feedback and suggestions based on your dataset, enhancing your ability to analyze data quality effortlessly.",
      icon: faRobot,
    },
    {
      title: "User-Friendly Interface",
      description: "Enjoy an intuitive and easy-to-navigate interface that makes data input and analysis straightforward for users of all skill levels.",
      icon: faUserFriends,
    },
    {
      title: "Custom Reports",
      description: "Generate detailed reports that highlight key findings and suggestions for your datasets, enabling informed decision-making and actionable insights.",
      icon: faFileAlt,
    },
    {
      title: "Support for Popular Documents",
      description: "Easily upload and analyze a variety of popular document formats, including CSV, Excel.",
      icon: faFileImport,
    },
  ];
  