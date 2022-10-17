import Sidebar from '../Sidebar/Sidebar';
import * as styles from './Layout.styles';
import Navbar from '../Navbar/Navbar';
import Head from 'next/head';
import { Container } from '../sharedstyles';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/ui-slice';


function Layout({ children, pageTitle, subtitle = '', center, avatarUrl }) {
  const dispatch = useDispatch()
  const isOpen = useSelector((state) => state.ui.isOpen)

  const closeSidebar = () => {
    dispatch(uiActions.close())
  }

  const openSidebar = () => {
    dispatch(uiActions.open())
  }

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
      <Navbar isOpen={isOpen} open={openSidebar} pageTitle={pageTitle} subtitle={subtitle} avatarUrl={avatarUrl}/>
      <Sidebar isOpen={isOpen} close={closeSidebar} />
      <styles.Main isOpen={isOpen}>
        <Container center={center}>
          {children}
        </Container>
      </styles.Main>
    </>
  );
}

export default Layout;