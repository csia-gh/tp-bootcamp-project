import { useEffect, useState } from 'react';
import * as styles from './Search.styles';
import { FaSearch } from 'react-icons/fa';
import { MdOutlineClear } from 'react-icons/md';

function Search() {
  const [searchValue, setSearchValue] = useState('');
  const [icon, setIcon] = useState(
    <FaSearch
      style={{
        width: '20px',
        height: '20px',
      }}
    />,
  );

  useEffect(() => {
    if (searchValue.trim() !== '') {
      setIcon(
        <MdOutlineClear
          style={{
            width: '20px',
            height: '20px',
          }}
          onClick={() => setSearchValue('')}
        />,
      );
    } else {
      setIcon(
        <FaSearch
          style={{
            width: '20px',
            height: '20px',
          }}
        />,
      );
    }
  }, [searchValue]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

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
  );
}

export default Search;
