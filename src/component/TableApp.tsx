import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { get } from "../Network";
import AddEmploye, { IEmployee } from "./AddEmploye";
import CustomTable from "./common/CustomTable";

const defaultValue = [
  {
    id: "",
    name: "",
    email: "",
    position: "",
  },
];

const TableApp = () => {
  const [employees, setEmployees] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // if we have proper api then, get first page data(here only  5 records) on table render then on click on next button of pagginatio we should have to call api to get other page data. for that we need totalpage or total number of record from api but https://www.mockapi.io/ api not providing it.

    get("employees").then((response) => {
      setEmployees(response.data);
      setIsLoading(false);
    });
  }, []);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Position",
        accessor: "position",
      },
    ],
    []
  );

  const tableData = React.useMemo(() => employees, [employees]);

  const onAddEmployee = (employeData: IEmployee) => {
    setEmployees([...employees, { ...employeData }]);
    setIsLoading(false);
  };

  return (
    <>
      <div className='d-flex justify-content-between align-items-center mb-3'>
        <h2 className='mb-0'>Table</h2>
        <Button onClick={toggle} color='primary'>
          + New
        </Button>
      </div>
      <CustomTable columns={columns} data={tableData} isLoading={isLoading} />
      {isOpen && (
        <AddEmploye
          isOpen={isOpen}
          toggle={toggle}
          onAddEmployee={onAddEmployee}
          setIsLoading={() => setIsLoading(true)}
        />
      )}
    </>
  );
};

export default TableApp;
