// Cấu hình router
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import HomePage from '../pages/HomePage/index.tsx';
import ProjectIntroductionPage from '../pages/SchoolProject/Introduction';
import AdministratorsPage from '../pages/SchoolProject/Administrators';
import PrimarySchoolsPage from '../pages/SchoolProject/Administrators/PrimarySchoolsPage';
import LowerSecondarySchoolsPage from '../pages/SchoolProject/Administrators/LowerSecondarySchoolsPage';
import HighSchoolsPage from '../pages/SchoolProject/Administrators/HighSchoolsPage';
import CreateSchoolPage from '../pages/SchoolProject/Administrators/CreateSchoolPage';
import HeadMastersPage from '../pages/SchoolProject/HeadMasters';
import TeachersPage from '../pages/SchoolProject/Teachers';
import ParentsPage from '../pages/SchoolProject/Parents';
import StudentsPage from '../pages/SchoolProject/Students';
import StaffAdminsPage from '../pages/SchoolProject/StaffAdmins';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'school-project',
        element: <ProjectIntroductionPage />,
      },
      {
        path: 'school-project/administrators',
        element: <AdministratorsPage />,
      },
      {
        path: 'school-project/administrators/tieu-hoc',
        element: <PrimarySchoolsPage />,
      },
      {
        path: 'school-project/administrators/thcs',
        element: <LowerSecondarySchoolsPage />,
      },
      {
        path: 'school-project/administrators/thpt',
        element: <HighSchoolsPage />,
      },
      {
        path: 'school-project/administrators/them-truong',
        element: <CreateSchoolPage />,
      },
      {
        path: 'school-project/head-masters',
        element: <HeadMastersPage />,
      },
      {
        path: 'school-project/teachers',
        element: <TeachersPage />,
      },
      {
        path: 'school-project/parents',
        element: <ParentsPage />,
      },
      {
        path: 'school-project/students',
        element: <StudentsPage />,
      },
      {
        path: 'school-project/staff-admins',
        element: <StaffAdminsPage />,
      },
    ],
  },
]);

