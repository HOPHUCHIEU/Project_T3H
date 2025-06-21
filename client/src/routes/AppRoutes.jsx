import { useRoutes } from 'react-router-dom';
import routes from './routes';
import Header from '../components/common/Header';

function AppRoutes() {
  const routing = useRoutes(routes);

  return (
    <>
      <Header />
      {routing}
    </>
  );
}

export default AppRoutes;
