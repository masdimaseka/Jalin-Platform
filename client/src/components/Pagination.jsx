import { Icon } from "@iconify/react/dist/iconify.js";

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    const delta = 1;

    if (totalPages <= 2) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);

      if (currentPage > delta + 2) {
        pageNumbers.push("...");
      }

      for (
        let i = Math.max(2, currentPage - delta);
        i <= Math.min(totalPages - 1, currentPage + delta);
        i++
      ) {
        pageNumbers.push(i);
      }

      if (currentPage < totalPages - delta - 1) {
        pageNumbers.push("...");
      }

      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-wrap mt-8 gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        className={`btn text-primary-jalin ${
          currentPage === 1 && "btn-disabled text-white"
        }`}
      >
        <Icon icon="grommet-icons:form-previous" width="24" height="24" />
      </button>
      {pageNumbers.map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === "number" && onPageChange(page)}
          disabled={page === "..."}
          className={`btn  ${
            page === currentPage ? "btn-primary " : "text-primary-jalin"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        className={`btn text-primary-jalin ${
          currentPage === totalPages && "btn-disabled text-white"
        }`}
      >
        <Icon icon="grommet-icons:form-next" width="24" height="24" />
      </button>
    </div>
  );
};
