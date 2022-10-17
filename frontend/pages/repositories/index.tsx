import { useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import PaginatedItems from '../../components/PaginatedItems/PaginatedItems';
import { selectRepositories } from '../../store/store';

import { fetchRepositoryData } from '../../store/repositories-slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export default function Repositories() {
  const dispatch = useAppDispatch();
  const repos = useAppSelector(selectRepositories);

  useEffect(() => {
    dispatch(fetchRepositoryData());
  }, [dispatch]);

  return (
    <Layout pageTitle="Repositories" center={false} avatarUrl={null}>
      {repos?.length ? (
        <PaginatedItems
          itemsPerPage={8}
          columns={0}
          items={repos}
          cards={true}
        />
      ) : (
        <h2>No repositories found</h2>
      )}
    </Layout>
  );
}
