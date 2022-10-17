import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

import * as styles from './Search.styles'
import { FaSearch } from 'react-icons/fa'
import { MdOutlineClear } from 'react-icons/md'
import { fetchRepositoryData } from '../../store/repositories-slice'
import { fetchUsersData } from '../../store/users-slice';

let isInitial = true

function Search() {
  const { asPath } = useRouter()
  const dispatch = useDispatch()
  const [searchValue, setSearchValue] = useState('')
  const [icon, setIcon] = useState(
    <FaSearch
      style={{
        width: '20px',
        height: '20px',
      }}
    />,
  )
  let handleSubmit = () => {}

  if (asPath === '/users') {
    handleSubmit = (event) => {
      event.preventDefault()
  
      if (searchValue.trim().length > 0) {
        dispatch(fetchUsersData(searchValue))
      }
    }
  } else if (asPath === '/repositories') {
    handleSubmit = (event) => {
      event.preventDefault()
  
      if (searchValue.trim().length > 0) {
        dispatch(fetchRepositoryData(searchValue))
      }
    }
  }

  useEffect(() => {
    if (isInitial) {
      isInitial = false
      return
    }

    if (searchValue.trim() !== '') {
      setIcon(
        <MdOutlineClear
          style={{
            width: '20px',
            height: '20px',
          }}
          onClick={() => setSearchValue('')}
        />,
      )
    } else {
      setIcon(
        <FaSearch
          style={{
            width: '20px',
            height: '20px',
          }}
        />,
      )

      if (asPath === '/users') {
        dispatch(fetchUsersData(searchValue))
      } else {
        dispatch(fetchRepositoryData())
      }
    }
  }, [searchValue])

  return (
    <styles.Container onSubmit={handleSubmit}>
      <styles.SearchField
        placeholder="Search by name"
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
      />
      <styles.SearchButton
        type="button"
        disabled={searchValue.length > 0}
        active={searchValue.length > 0}
      >
        {icon}
      </styles.SearchButton>
    </styles.Container>
  )
}

export default Search
