import { useRouter } from 'next/router';
import { FaBars } from 'react-icons/fa';

import Search from '../Search/Search';

import * as styles from './Navbar.styles';

function Subtitle({ subtitle }: { subtitle: string; }) {
  if (subtitle) {
    return <styles.Subtitle>{subtitle}</styles.Subtitle>;
  } else {
    return <span></span>;
  }
}

interface Props {
  isSidebarOpen: boolean;
  open: () => void;
  pageTitle: string;
  subtitle: string;
  avatarUrl: string;
}

function Navbar({ isSidebarOpen, open, pageTitle, subtitle, avatarUrl }: Props) {
  const { asPath } = useRouter();

  const showSearch = ['/users', '/repositories'].includes(asPath);

  return (
    <styles.Navbar>
      <styles.NavbarLeft isOpen={isSidebarOpen}>
        <styles.OpenMenu onClick={open}>
          <FaBars />
        </styles.OpenMenu>
      </styles.NavbarLeft>
      <styles.NavbarRight>
        <styles.PageTitle isSubpage={!!subtitle} hasAvatar={!!avatarUrl}>{pageTitle} {avatarUrl && <styles.Avatar src={avatarUrl} alt='avatar' />} <Subtitle subtitle={subtitle} /></styles.PageTitle>
        {showSearch && <Search />}
      </styles.NavbarRight>
    </styles.Navbar>
  );
}

export default Navbar;
