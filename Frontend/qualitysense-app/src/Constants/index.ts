import { faHistory, faDatabase, faCalendarAlt, faInfoCircle, faSignOutAlt, faFileCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle, faExclamationTriangle, faRobot, faUserFriends, faFileAlt, faFileImport } from '@fortawesome/free-solid-svg-icons';
import activity from '../assets/activity.png';
import data from '../assets/data.png';
import report from '../assets/report.png';
import Help from '../assets/Help.png';
export const menuItems = [

    { icon: faHistory, text: "Activity Logs", url: '/dashboard/activity' },
    { icon: faFileCircleCheck, text: "Quality Reports", url: '/dashboard/response' },
    { icon: faDatabase, text: "Data Sources", url: '/dashboard/data' },
    { icon: faCalendarAlt, text: "Calendar", url: '/dashboard/calendar' },
    { icon: faInfoCircle, text: "Help", url: '/dashboard/help' },
    {icon: faSignOutAlt, text: "Logout"}
   
];



export const getStarted = [
  {
      title: "Login with a Valid Email Address",
      description: "To begin using the application, you must log in with a valid email address. You can use either your Gmail account or a custom registration to create your account."
  },
  {
      title: "Navigating the Dashboard",
      description: "After logging in, you'll be directed to the generate page where you can access various features. Familiarize yourself with the sidebar for easy navigation."
  },
  {
      title: "Importing Datasets",
      description: "You can import datasets directly into the application. Ensure your files are in the correct format to avoid errors during the import process. Accepted formats are CSV and Excel files only."
  },
  {
      title: "Generating Data Quality Reports",
      description: "Once your datasets are uploaded, you can generate quality reports. The AI will assess the quality of your data, check for possible errors in categorical values, column data types, and provide suggestions to address columns with null values and the count of detected outliers."
  }
]

export const dashboardSections = [
  {
      title: "Activity Logs",
      description: "This section displays a history of your actions within the app, such as the file uploaded, date and time of upload, status, and total columns and rows. Use this to track your progress and review past actions.",
      image: activity
  },
  {
      title: "Quality Reports",   
      description: "This section contains cards for each dataset you've uploaded. Click on a card to view AI-generated reports, which contain the suggestions and checking of data. Users can also delete their generated data or download it as a PDF file.",
      image: report
  },
  {
      title: "Data Sources",
      description: "Links to get datasets for machine learning and data science projects which you can access in QualitySense.",
      image: data
  },
  {
      title: "Help (This Page)",   
      description:"User’s guide to QualitySense. This section provides comprehensive information about the various pages and features within the application. ",
      image: Help
   }
];

export const cardItems = [
  {
    text: "Kaggle",
    desc: "A platform for data science competitions and a vast repository of datasets across various domains.",
    url: "https://www.kaggle.com/datasets"
  },
  {
    text: "UCI Machine Learning Repository",
    desc: "A collection of databases, domain theories, and data generators widely used for empirical studies of machine learning algorithms.",
    url: "http://archive.ics.uci.edu/ml/index.php"
  },
  {
    text: "Google Dataset Search",
    desc: "A tool that enables users to find datasets stored across the web, including various domains like health, finance, and more.",
    url: "https://datasetsearch.research.google.com/"
  },
  {
    text: "Data.gov",
    desc: "The U.S. government's open data platform providing access to thousands of datasets covering various topics and sectors.",
    url: "https://www.data.gov/"
  },
  {
    text: "AWS Public Datasets",
    desc: "A repository of publicly available datasets hosted on Amazon Web Services, covering a wide range of topics from genomics to climate data.",
    url: "https://registry.opendata.aws/"
  },
  {
    text: "FiveThirtyEight",
    desc: "A website that provides datasets used in their articles, covering topics such as politics, sports, and economics.",
    url: "https://data.fivethirtyeight.com/"
  },
  {
    text: "World Bank Open Data",
    desc: "A comprehensive source of global development data, including economic, social, and environmental indicators.",
    url: "https://data.worldbank.org/"
  },
  {
    text: "Open Data Portal",
    desc: "A collection of datasets made available by various organizations, including city, state, and federal government data.",
    url: "https://opendata.org/"
  },
  {
    text: "KDNuggets",
    desc: "A popular data science and machine learning resource that also provides datasets for analysis.",
    url: "https://www.kdnuggets.com/datasets/index.html"
  },
  {
    text: "European Union Open Data Portal",
    desc: "Provides access to a wealth of data produced by the European Union institutions and bodies.",
    url: "https://data.europa.eu/en"
  },
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
  