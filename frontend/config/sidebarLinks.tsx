import { FaDatabase, FaUsers } from 'react-icons/fa';

const sidebarLinks: {
  title: string;
  path: string;
  icon: JSX.Element;
}[] = [
    {
      title: 'Repositories',
      path: '/repositories',
      icon: <FaDatabase />
    },
    {
      title: 'Users',
      path: '/users',
      icon: <FaUsers />
    },
  ];

export default sidebarLinks;