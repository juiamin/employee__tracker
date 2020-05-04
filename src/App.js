import React, { useState, useMemo } from 'react';
import {
  Jumbotron,
  Container,
  Row,
  Col,
  ToggleButtonGroup,
  ToggleButton,
  Form,
  Card,
  Table,
  Image,
} from 'react-bootstrap';

import employeeList from './utils/employeeList';

function App() {
  const [employees] = useState(employeeList);
  const [filterSearch, setFilterSearch] = useState('');
  const [filterCriteria, setFilterCriteria] = useState('name');
  const [displayOption, setDisplayOption] = useState('table');

  // {columnName: 'name, dept, etc', direction: 'ascending'}
  const [sortConfig, setSortConfig] = useState(null);

  const handleSort = (columnName) => {
    // set initial direction
    let direction = 'ascending';
    if (sortConfig?.columnName === columnName && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    setSortConfig({ columnName, direction });
  };

  const sortedEmployees = useMemo(() => {
    const sortedEmployees = [...employees];

    if (sortConfig !== null) {
      sortedEmployees.sort((a, b) => {
        if (a[sortConfig.columnName] < b[sortConfig.columnName]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.columnName] > b[sortConfig.columnName]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortedEmployees;
  }, [employees, sortConfig]);

  return (
    <>
      <Jumbotron fluid className='bg-dark text-light'>
        <Container>
          <h1>
            <span role='img' aria-label='Fencing emoji'>
              🤺
            </span>{' '}
            Employee Trackr
          </h1>
        </Container>
      </Jumbotron>

      <Container fluid>
        <Row>
          {/* form and adjusting table view */}
          <Col xs={12} lg={3}>
            <h2>Adjust your table view!</h2>
            <Form>
              <Form.Group>
                <Form.Label>Filter results</Form.Label>
                <Form.Control
                  name='filterSearch'
                  onChange={(e) => setFilterSearch(e.target.value)}
                  value={filterSearch}
                  type='text'
                  placeholder='Start typing...'
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Select Category to Filter By</Form.Label>
                <Form.Control as='select' onChange={(e) => setFilterCriteria(e.target.value)}>
                  <option value='name'>Name</option>
                  <option value='department'>Department</option>
                  <option value='city'>City</option>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Pick a Display Option</Form.Label>
                <ToggleButtonGroup name='display-options'>
                  <ToggleButton type='radio' value='table' onChange={(e) => setDisplayOption(e.target.value)}>
                    Table
                  </ToggleButton>
                  <ToggleButton type='radio' value='grid' onChange={(e) => setDisplayOption(e.target.value)}>
                    Grid
                  </ToggleButton>
                </ToggleButtonGroup>
              </Form.Group>
            </Form>
          </Col>

          {/* table/grid */}
          <Col xs={12} lg={9}>
            <h2>See your employees.</h2>
            {/* Show table or cards based on state */}
            {displayOption === 'table' ? (
              <Table bordered hover striped responsive='md'>
                <thead>
                  <tr>
                    <th onClick={() => handleSort(null)}>#</th>
                    <th onClick={() => handleSort('name')}>
                      <span className='mr-3'>Name</span>
                      {sortConfig?.columnName === 'name' && (
                        <span>{sortConfig.direction === 'ascending' ? '⬆️' : '⬇️'}</span>
                      )}
                    </th>
                    <th onClick={() => handleSort('department')}>
                      <span className='mr-3'>Department</span>
                      {sortConfig?.columnName === 'department' && (
                        <span>{sortConfig.direction === 'ascending' ? '⬆️' : '⬇️'}</span>
                      )}
                    </th>
                    <th onClick={() => handleSort('city')}>
                      <span className='mr-3'>City</span>
                      {sortConfig?.columnName === 'city' && (
                        <span>{sortConfig.direction === 'ascending' ? '⬆️' : '⬇️'}</span>
                      )}
                    </th>
                    <th>Image</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedEmployees
                    .filter((employee) => {
                      return employee[filterCriteria].toLowerCase().includes(filterSearch.toLowerCase());
                    })
                    .map((employee, idx) => {
                      return (
                        <tr key={employee.id}>
                          <td>{idx + 1}</td>
                          <td>{employee.name}</td>
                          <td>{employee.department}</td>
                          <td>{employee.city}</td>
                          <td>
                            <Image
                              style={{ maxWidth: 150 }}
                              fluid
                              src={employee.imageUrl}
                              alt={`Profile picture for ${employee.name}`}
                            />
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            ) : (
              <Row>
                {employees
                  .filter((employee) => {
                    return employee[filterCriteria].toLowerCase().includes(filterSearch.toLowerCase());
                  })
                  .map((employee, idx) => {
                    return (
                      <Col key={employee.id} xs={12} md={6} lg={3} className='d-flex mb-3'>
                        <Card border='primary'>
                          <Card.Img
                            variant='top'
                            src={employee.imageUrl}
                            alt={`Profile picture for ${employee.name}`}
                          />
                          <Card.Body>
                            <Card.Title>{employee.name}</Card.Title>
                            <h5>{employee.department}</h5>
                            <small>From: {employee.city}</small>
                          </Card.Body>
                        </Card>
                      </Col>
                    );
                  })}
              </Row>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
