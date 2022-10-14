import { FaDatabase, FaUsers } from 'react-icons/fa';

const sidebarLinks: {
  title: string;
  path: string;
  icon: JSX.Element;
  subMenu?: string;
  testPath?: any;
}[] = [
    {
      title: 'Repositories',
      path: '/repositories',
      icon: <FaDatabase />,
      subMenu: 'Contributions',
      testPath: (path) => /^\/repositories\/(\d+)/.test(path)
    },
    {
      title: 'Users',
      path: '/users',
      icon: <FaUsers />
    },
  ];

export default sidebarLinks;