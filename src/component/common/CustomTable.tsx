import React, { FunctionComponent } from "react";
import { useTable, usePagination } from "react-table";
import { Button, Pagination, Table } from "reactstrap";
import Loader from "./Loader";

export interface IData {
  id: string;
  name: string;
  email: string;
  position: string;
  [index: string]: string;
}

interface IColumn {
  Header: string;
  accessor: string;
}

interface ICustomTable {
  columns: IColumn[];
  data: IData[];
  isLoading: boolean;
}

declare module "react-table" {
  interface TableState<D extends object = {}> extends UsePaginationState<D> {}
  interface TableInstance<D extends object = {}>
    extends UsePaginationInstanceProps<D> {}
}

const CustomTable: FunctionComponent<ICustomTable> = ({
  columns,
  data,
  isLoading,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    usePagination
  );

  return (
    <>
      <Table {...getTableProps()} striped>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {isLoading ? (
            <tr>
              <td colSpan={columns.length}>
                <Loader />
              </td>
            </tr>
          ) : (
            page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })
          )}
        </tbody>
      </Table>

      <Pagination size='sm' aria-label='Page navigation example'>
        <Button
          size='sm'
          color='primary'
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          className='mr-2'
        >
          {"<<"}
        </Button>
        <Button
          size='sm'
          color='primary'
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className='mr-2'
        >
          {"<"}
        </Button>
        <span className='mr-2'>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <Button
          size='sm'
          color='primary'
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className='mr-2'
        >
          {">"}
        </Button>
        <Button
          size='sm'
          color='primary'
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          className='mr-2'
        >
          {">>"}
        </Button>
      </Pagination>
    </>
  );
};
export default CustomTable;
