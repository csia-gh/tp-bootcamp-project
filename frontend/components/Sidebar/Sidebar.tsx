import { useRouter } from "next/router";

import Link from 'next/link';
import * as styles from './Sidebar.styles';
import { FaCampground, FaTimes } from 'react-icons/fa';

import sidebarLinks from '../../config/sidebarLinks';

function Sidebar({ isOpen, setIsOpen }) {
  const router = useRouter();

  return (
    <styles.Sidebar open={isOpen}>
      <styles.SidebarHeader>
        <Link href="/">
          <a>
            <FaCampground />
            <span style={{ marginLeft: '16px' }}>BootCamp</span>
          </a>
        </Link>

        <styles.CloseMenu onClick={() => setIsOpen(false)}>
          <FaTimes />
        </styles.CloseMenu>
      </styles.SidebarHeader>

      {sidebarLinks.map((item, index) => {
        return (
          <styles.MenuItem key={index}>
            <Link href={item.path}>
              <styles.MenuLinks active={router.pathname === item.path}>
                {item.icon}
                <styles.LinkTitle>{item.title}</styles.LinkTitle>
              </styles.MenuLinks>
            </Link>
          </styles.MenuItem>
        );
      })}
    </styles.Sidebar>
  );
}

export default Sidebar;
