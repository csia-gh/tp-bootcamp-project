import { useEffect } from 'react';

import TableImage from '../../components/TableImage/TableImage';
import PaginateItems from '../../components/PaginatedItems/PaginatedItems';
import { usersTableColumns } from '../../config/table';
import { fetchUsersData } from '../../store/users-slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectUsers } from '../../store/store';
import { IUserWithImage } from '../../models/UserWithImage';
import Layout from '../../components/Layout/Layout';

export default function Users() {
  const dispatch = useAppDispatch();
  const usersPlain = useAppSelector(selectUsers);

  useEffect(() => {
    dispatch(fetchUsersData());
  }, [dispatch]);

  const users: IUserWithImage[] = usersPlain.map((user) => {
    return { ...user, avatar: <TableImage src={user.avatar_url} alt={user.login} /> };
  });

  return (
    <Layout pageTitle="User List" center={true} avatarUrl={null}>
      <PaginateItems
        itemsPerPage={8}
        columns={usersTableColumns}
        items={users}
        toHref="/users/[name]"
        objectKey="login"
      />
    </Layout>
  );
}
