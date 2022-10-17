import { useEffect } from 'react';
import Layout from '../../../components/Layout/Layout';
import PaginatedItems from '../../../components/PaginatedItems/PaginatedItems';
import TableImage from '../../../components/TableImage/TableImage';
import { IUserWithImage } from '../../../models/UserWithImage';
import { contributionsTableColumns } from '../../../config/table';
import { fetchContributorsData } from '../../../store/contributors-slice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { selectContributors } from '../../../store/store';

export default function Contributors({ id }) {
  const dispatch = useAppDispatch();
  const contributorsPlain = useAppSelector(selectContributors);
  const pageTitle = `Repository #${id}`;

  useEffect(() => {
    dispatch(fetchContributorsData(id));
  }, [dispatch]);

  const contributors: IUserWithImage[] = contributorsPlain
    ? contributorsPlain.map((user): IUserWithImage => {
      return { ...user, avatar: <TableImage src={user.avatar_url} alt={user.login} /> };
    })
    : [];

  return (
    <Layout pageTitle={pageTitle} subtitle="Contributors" center={true} avatarUrl={null}>
      <PaginatedItems
        itemsPerPage={8}
        columns={contributionsTableColumns}
        items={contributors}
        toHref="/users/[name]"
        objectKey="login"
      />
    </Layout>
  );
}

Contributors.getInitialProps = async ({ query }) => {
  const { id } = query;

  return {
    id,
  };
};
