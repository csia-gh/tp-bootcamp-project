import Sidebar from '../Sidebar/Sidebar';
import * as styles from './Layout.styles';
import Navbar from '../Navbar/Navbar';
import Head from 'next/head';
import { Container } from '../sharedstyles';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { uiActions } from '../../store/ui-slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectIsSidebarOpen } from '../../store/store';

interface Props extends React.PropsWithChildren {
  pageTitle: string;
  subtitle?: string;
  center: boolean;
  avatarUrl: string;
}

function Layout({ children, pageTitle, subtitle = '', center, avatarUrl }: Props) {
  const dispatch = useAppDispatch();
  const isSidebarOpen = useAppSelector(selectIsSidebarOpen);

  const closeSidebar = () => {
    dispatch(uiActions.close());
  };

  const openSidebar = () => {
    dispatch(uiActions.open());
  };

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
      <Navbar isSidebarOpen={isSidebarOpen} open={openSidebar} pageTitle={pageTitle} subtitle={subtitle} avatarUrl={avatarUrl} />
      <Sidebar isOpen={isSidebarOpen} close={closeSidebar} />
      <styles.Main isOpen={isSidebarOpen}>
        <Container center={center}>
          {children}
        </Container>
      </styles.Main>
    </>
  );
}

export default Layout;