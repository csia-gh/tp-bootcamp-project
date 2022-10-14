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

function Navbar({ isOpen, setIsOpen, pageTitle, subtitle }) {
  const router = useRouter();

  const showSearch = router.pathname === '/repositories';

  return (
    <styles.Navbar>
      <styles.NavbarLeft open={isOpen}>
        <styles.OpenMenu onClick={() => setIsOpen(true)}>
          <FaBars />
        </styles.OpenMenu>
      </styles.NavbarLeft>
      <styles.NavbarRight>
        <styles.PageTitle>{pageTitle} <Subtitle subtitle={subtitle} /></styles.PageTitle>
        {showSearch && <Search />}
      </styles.NavbarRight>
    </styles.Navbar>
  );
}

export default Navbar;
