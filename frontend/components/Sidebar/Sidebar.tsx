import { useRouter } from "next/router";

import Link from 'next/link';
import * as styles from './Sidebar.styles';
import { FaCampground, FaTimes } from 'react-icons/fa';

import sidebarLinks from '../../config/sidebarLinks';

interface Props { isOpen: boolean; close: () => void; }

function Sidebar({ isOpen, close }: Props) {
  const router = useRouter();

  return (
    <styles.Sidebar isOpen={isOpen}>
      <styles.SidebarHeader>
        <Link href="/">
          <a>
            <FaCampground />
            <span style={{ marginLeft: '16px' }}>BootCamp</span>
          </a>
        </Link>

        <styles.CloseMenu onClick={close}>
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

            {
              item.testPath && item.testPath(router.asPath) && <styles.SubMenu>{item.subMenu}</styles.SubMenu>
            }
          </styles.MenuItem>
        );
      })}
    </styles.Sidebar>
  );
}

export default Sidebar;
