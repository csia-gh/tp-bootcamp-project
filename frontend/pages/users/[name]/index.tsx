import { useEffect } from 'react'

import { fetchRepositoriesOfAUser } from '../../../store/repositories-slice'
import { fetchUsersData } from '../../../store/users-slice'
import Layout from '../../../components/Layout/Layout'
import PaginatedItems from '../../../components/PaginatedItems/PaginatedItems'
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { selectRepositories, selectUsers } from '../../../store/store';

export default function UsersRepositories({ name }) {
  const dispatch = useAppDispatch()
  const repos = useAppSelector(selectRepositories)
  const [user] = useAppSelector(selectUsers)
  const pageTitle = `User (${name})`

  useEffect(() => {
    dispatch(fetchRepositoriesOfAUser(name))
    dispatch(fetchUsersData(name))
  }, [dispatch])

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
          columns={0}
          items={repos}
          cards={true}
        />
      ) : (
        <h2>No repositories found</h2>
      )}
    </Layout>
  )
}

UsersRepositories.getInitialProps = async ({ query }) => {
  const { name } = query

  return {
    name,
  }
}
