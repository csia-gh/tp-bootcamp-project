import Sidebar from '../Sidebar/Sidebar';
import { UiContext } from '../../contexts/UiContext.js';
import * as styles from './Layout.styles';
import { useContext } from 'react';
import Navbar from '../Navbar/Navbar';
import Head from 'next/head';
import { Container } from '../sharedstyles';

function Layout({ children, pageTitle }) {
  const { isOpen, setIsOpen } = useContext(UiContext);

  return (
    <>
      <Head>
        <title>BootCamp | {pageTitle}</title>
      </Head>
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} pageTitle={pageTitle} />
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <styles.Main open={isOpen}>
        <Container>
          {children}
        </Container>
      </styles.Main>
    </>
  );
}

export default Layout;