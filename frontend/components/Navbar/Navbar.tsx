import { FaBars } from 'react-icons/fa'

import * as styles from './Navbar.styles'

function Navbar({ isOpen, setIsOpen, pageTitle }) {
  return (
    <styles.Navbar>
      <styles.NavbarLeft open={isOpen}>
        <styles.OpenMenu onClick={() => setIsOpen(true)}>
          <FaBars />
        </styles.OpenMenu>
      </styles.NavbarLeft>
      <styles.NavbarRight>
        <styles.PageTitle>{pageTitle}</styles.PageTitle>
        {/* <SearchContainer /> */}
      </styles.NavbarRight>
    </styles.Navbar>
  )
}

export default Navbar
