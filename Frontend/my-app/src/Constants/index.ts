import { faMagicWandSparkles, faHistory, faDatabase, faCalendarAlt, faChartLine, faInfoCircle, faSignOutAlt, } from '@fortawesome/free-solid-svg-icons';


export const menuItems = [
    { icon: faMagicWandSparkles, text: "Generate" , url:'/generate'},
    { icon: faHistory, text: "Activity Logs", url:'/activity'},
    { icon: faDatabase, text: "Data Sources", url:'/data'},
    { icon: faCalendarAlt, text: "Calendar", url:'/calendar'},
    { icon: faChartLine, text: "Visualizations", url:'/visualizations'},
    { icon: faInfoCircle, text: "Help", url:'/help'},
    { icon: faSignOutAlt, text: "Logout", url:'/login'},
  ];

