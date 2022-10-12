import * as styles from './Pagination.styles';

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <styles.Pagination>
      <styles.Ul>
        {pageNumbers.map(number => (
          <li key={number}>
            <styles.Button onClick={() => paginate(number)} active={currentPage === number}>
              {number}
            </styles.Button>
          </li>
        ))}
      </styles.Ul>
    </styles.Pagination>
  );
};

export default Pagination;
