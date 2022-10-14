import Sidebar from '../Sidebar/Sidebar';
import { UiContext } from '../../contexts/UiContext.js';
import * as styles from './Layout.styles';
import { useContext } from 'react';
import Navbar from '../Navbar/Navbar';
import Head from 'next/head';
import { Container } from '../sharedstyles';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function Layout({ children, pageTitle, subtitle = '', center }) {
  const { isOpen, setIsOpen } = useContext(UiContext);
  const title = `BootCamp | ${pageTitle}`;
  return (
    <>
      <ToastContainer position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        theme="light" />
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} pageTitle={pageTitle} subtitle={subtitle} />
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <styles.Main open={isOpen}>
        <Container center={center}>
          {children}
        </Container>
      </styles.Main>
    </>
  );
}

export default Layout;