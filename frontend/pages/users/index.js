import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Layout from '../../components/Layout/Layout'
import Pagination from '../../components/Pagination/Pagination'
import Table from '../../components/Table/Table'
import TableImage from '../../components/TableImage/TableImage'

import { usersTableColumns } from '../../config/table'

import {
  getContributors,
  getRepositories,
  getUsers,
} from '../../services/dataService'
import { fetchUsersData } from '../../store/users-slice'

export default function Users() {
  const dispatch = useDispatch()
  const usersPlain = useSelector((state) => state.users.items)

  useEffect(() => {
    dispatch(fetchUsersData())
  }, [dispatch])

  // const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage] = useState(10)

  const users = usersPlain.map((user) => {
    return { ...user, avatar: <TableImage src={user.avatar_url} /> }
  })

  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <Layout pageTitle="Users" center={true}>
      <Table columns={usersTableColumns} list={currentUsers} />
      <Pagination
        itemsPerPage={usersPerPage}
        totalItems={users.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </Layout>
  )
}
