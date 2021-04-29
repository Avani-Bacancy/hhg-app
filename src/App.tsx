import React from "react";
import { Col, Container, Row } from "reactstrap";
import "./App.css";
import Counter from "./component/Counter";
import TableApp from "./component/TableApp";

function App() {
  return (
    <Container>
      <Row>
        <Col xs={12}>
          <Counter />
          <TableApp />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
