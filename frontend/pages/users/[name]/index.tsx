import { useEffect, useState } from 'react';

import { fetchRepositoriesOfAUser } from '../../../store/repositories-slice';
import { fetchUsersData } from '../../../store/users-slice';
import Layout from '../../../components/Layout/Layout';
import PaginatedItems from '../../../components/PaginatedItems/PaginatedItems';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { selectRepositories, selectUsers } from '../../../store/store';
import { useRouter } from 'next/router';

export default function UsersRepositories() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const repos = useAppSelector(selectRepositories);
  const [user] = useAppSelector(selectUsers);
  const [pageTitle, setPageTitle] = useState('User ');

  useEffect(() => {
    const { query } = router;
    const name = query.name as string;
    setPageTitle(`User (${name}) `);
    dispatch(fetchRepositoriesOfAUser(name));
    dispatch(fetchUsersData(name));
  }, [dispatch, router]);

  return (
    <Layout
      pageTitle={pageTitle}
      subtitle="Contributions"
      avatarUrl={user?.avatar_url}
      center={false}
    >
      {repos?.length ? (
        <PaginatedItems
          itemsPerPage={8}
          items={repos}
          cards={true} toHref={''} objectKey={''} />
      ) : (
        <h2>No repositories found</h2>
      )}
    </Layout>
  );
}
