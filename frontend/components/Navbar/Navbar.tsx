import { useRouter } from 'next/router';
import { FaBars } from 'react-icons/fa';

import Search from '../Search/Search';

import * as styles from './Navbar.styles';

function Subtitle({ subtitle }) {
  if (subtitle) {
    return <styles.Subtitle>{subtitle}</styles.Subtitle>;
  } else {
    return <span></span>;
  }
}

function Navbar({ isOpen, open, pageTitle, subtitle, avatarUrl }) {
  const { asPath } = useRouter();

  const showSearch = ['/users', '/repositories'].includes(asPath);

  return (
    <styles.Navbar>
      <styles.NavbarLeft isOpen={isOpen}>
        <styles.OpenMenu onClick={open}>
          <FaBars />
        </styles.OpenMenu>
      </styles.NavbarLeft>
      <styles.NavbarRight>
        <styles.PageTitle  isSubpage={!!subtitle} hasAvatar={!!avatarUrl}>{pageTitle} {avatarUrl && <styles.Avatar src={avatarUrl} alt='avatar' />} <Subtitle subtitle={subtitle} /></styles.PageTitle>
        {showSearch && <Search />}
      </styles.NavbarRight>
    </styles.Navbar>
  );
}

export default Navbar;
