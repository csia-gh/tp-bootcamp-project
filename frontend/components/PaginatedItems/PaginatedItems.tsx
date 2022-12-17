import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

import Table from '../Table/Table';
import Cards from '../Cards/Cards';

import * as styles from './PaginatedItems.styles';
import { ITableColumn } from '../../config/table';

interface Props {
  itemsPerPage: number;
  columns?: ITableColumn[];
  items: any[];
  cards?: boolean;
  toHref: string;
  objectKey: string;
}

function PaginatedItems({
  itemsPerPage,
  columns = [],
  items,
  cards = false,
  toHref = '',
  objectKey = '',
}: Props) {
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, items]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      {!cards && (
        <Table
          columns={columns}
          list={currentItems}
          toHref={toHref}
          objectKey={objectKey}
        />
      )}
      {cards && <Cards repositories={currentItems} />}

      {items.length > itemsPerPage && (
        <styles.Pagination>
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            activeClassName="active"
          />
        </styles.Pagination>
      )}
    </>
  );
}

export default PaginatedItems;
