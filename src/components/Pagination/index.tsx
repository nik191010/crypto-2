import ReactPaginate from 'react-paginate';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';

import styles from './Pagination.module.scss';

interface PaginationI {
  pageCount: number;
  currentPage: number;
  handlePageClick: (event: { selected: number }) => void;
}

const Pagination: React.FC<PaginationI> = ({
  pageCount,
  currentPage,
  handlePageClick,
}) => {
  return (
    <>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        previousLabel={
          <span>
            <HiArrowLeft />
            Previous
          </span>
        }
        nextLabel={
          <span>
            Next
            <HiArrowRight />
          </span>
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        marginPagesDisplayed={1}
        forcePage={currentPage}
      />
    </>
  );
};

export default Pagination;
