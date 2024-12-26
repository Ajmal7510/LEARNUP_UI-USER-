import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PieChartIcon from '@mui/icons-material/PieChart';
import AssessmentIcon from '@mui/icons-material/Assessment';
import MessageIcon from '@mui/icons-material/Message';
import AccountBoxIcon from '@mui/icons-material/AccountBox';





export const SidebarData = [
    {
      title: "Overview",
      icon: <HomeIcon />,
      link: "/instructor/overview",
    },
    {
      title: "My Courses",
      icon: <MenuBookIcon color="white" />,
      link: "/instructor/my-courses",
    },
    {
      title: "Analytics",
      icon: <PieChartIcon />,
      link: "/instructor/analytics",
    },
   
    {
      title: "Assessments",
      icon: <AssessmentIcon />,
      link: "/instructor/assessments",
    },
    {
      title: "Messages",
      icon: <MessageIcon />,
      link: "/instructor/Messages",
    },
    {
      title: "Profile",
      icon: < AccountBoxIcon/>,
      link: "/instructor/profile",
    },
  ];
  