import { useState, useEffect } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../all-views-scss/_datatable.scss'
import { FaEdit, FaTrash, FaFilter } from 'react-icons/fa';
import { MdNumbers } from 'react-icons/md';
import { BsFiletypeCsv, BsFillPlusSquareFill } from 'react-icons/bs';
import { RiCalendarTodoFill } from 'react-icons/ri';
import { GiReceiveMoney, GiMoneyStack, GiPayMoney } from 'react-icons/gi';
import { FiRefreshCcw, FiUpload } from 'react-icons/fi';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from "src/api/axios";


const ASSOCDUE_GET_URL = "/invoice/getAllAssocDue";
const AssocDueList = () => {
  const [data, setData] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [formData, setFormData] = useState({
    invoice_num: '',
    unit_num: '',
    billed_to: '',
    bill_cost: '',
    discount: '',
    penalty: '',
    due_date: '',
  });

  useEffect(() => {
    axios.post(ASSOCDUE_GET_URL).then((response) => {
      setData(response.data);
    });
  }, []);

  $(function() {
    $("#example").dataTable();
  });

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const handleAddNewEntry = () => {
    setShowAddModal(true);
  };

  const handleUploadEntry = () => {
    setShowUploadModal(true);
  };

  const handleEditButtonClick = (data) => {
    setSelectedData(data);
    setFormData(data);
    setShowEditModal(true);
  };

  const handleDeleteButtonClick = (data) => {
    setSelectedData(data);
    setShowDeleteModal(true);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newId = data.length + 1;
    const newData = { id: newId, ...formData };
    setData([...data, newData]);
    setFormData({ invoice_num: '', unit_num: '', billed_to: '', bill_cost: '', discount: '', penalty: '', due_date: '' });
    setShowAddModal(false);
  };

  const handleUploadFormSubmit = (event) => {
    event.preventDefault();
    const newId = data.length + 1;
    const newData = { id: newId, ...formData };
    setData([...data, newData]);
    setFormData({ invoice_num: '', unit_num: '', billed_to: '', bill_cost: '', discount: '', penalty: '',  due_date: '' });
    setShowUploadModal(false);
  };


  const handleUpdateSubmit = (event) => {
    event.preventDefault();
    const newData = data.map((item) =>
      item.id === selectedData.id ? formData : item
    );
    setData(newData);
    setFormData({ invoice_num: '', unit_num: '', billed_to: '', bill_cost: '', discount: '', penalty: '',  due_date: '' });
    setSelectedData({});
    setShowEditModal(false);
  };

  const handleDeleteConfirm = () => {
    const newData = data.filter((item) => item.id !== selectedData.id);
    setData(newData);
    setSelectedData({});
    setShowDeleteModal(false);
  };

  return (
    <div className="wrap">
      <div className="head-container">
        <div className="table-head">
          <Form.Group controlId="dateFrom" className="filter-date-from">
            <Form.Label className="filter-date-label">From</Form.Label>
            <Form.Control
              className="filter-date-input"
              type="date"
              placeholder="yyyy-mm-dd"
              name="datFrom"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="dateTo" className="filter-date-to">
            <Form.Label className="filter-date-label">To</Form.Label>
            <Form.Control
              className="filter-date-input"
              type="date"
              placeholder="yyyy-mm-dd"
              name="dateTo"
              onChange={handleInputChange}
            />
          </Form.Group>
          <div className="thead-btn">
            <Button className="thead-btn-primary" name="filter" type="submit">
              <FaFilter />
            </Button>
            <Button className="thead-btn-secondary">
              <FiRefreshCcw />
            </Button>
            <Button className="thead-btn-tertiary" onClick={handleAddNewEntry}>
              <BsFillPlusSquareFill />
            </Button>
            <Button className="thead-btn-quaternary" onClick={handleUploadEntry}>
              <FiUpload />
            </Button>
          </div>
        </div>
      </div>
      <br/>
      <div className="container">
        <br/>
        <div className="tbl-title">
          <h1 className="text-divider">ASSOCIATION DUE LIST</h1>
        </div>
        <div className="divider"></div><hr />
        <table id="example" className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Invoice No.</th>
              <th>Unit No.</th>
              <th>Billed To</th>
              <th>Billing Cost</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.invoice_no}</td>
                <td>{entry.unit_no}</td>
                <td>{entry.billed_to}</td>
                <td>{entry.amount}</td>
                <td>{entry.due_date}</td>
                <td>
                  {' '}
                  <Button
                    className="edit"
                    onClick={() => handleEditButtonClick(entry)}
                  >
                    <FaEdit />
                  </Button>
                  {' '}
                  <Button
                    className="delete"
                    onClick={() => handleDeleteButtonClick(entry)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ADD MODAL START*/}
        <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
          <br/>
          <h1 className="text-divider">Add New Due</h1>
          <Modal.Body>
            <Form onSubmit={handleFormSubmit}>
              <Form.Group controlId="invoice_num" className="addForm">
                <Form.Label className="formIcon"><MdNumbers /></Form.Label>
                <Form.Control
                  className="formField"
                  type="text"
                  placeholder="Enter invoice number"
                  name="invoice_num"
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="unit_num" className="addForm">
                <Form.Label className="formIcon"><MdNumbers /></Form.Label>
                <Form.Control
                  className="formField"
                  type="text"
                  placeholder="Enter unit number"
                  name="unit_num"
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="billed_to" className="addForm">
                <Form.Label className="formIcon"><GiReceiveMoney /></Form.Label>
                <Form.Control
                  className="formField"
                  type="text"
                  placeholder="Enter billed to"
                  name="billed_to"
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="bill_cost" className="addForm">
                <Form.Label className="formIcon"><GiMoneyStack /></Form.Label>
                <Form.Control
                  className="formField"
                  type="text"
                  placeholder="Enter bill cost"
                  name="bill_cost"
                  onChange={handleInputChange}
                />
              </Form.Group>
          
              <Form.Group controlId="discount" className="addForm">
                <Form.Label className="formIcon"><GiPayMoney /></Form.Label>
                <Form.Control
                  className="formField"
                  type="text"
                  placeholder="Enter discount"
                  name="discount"
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="penalty" className="addForm">
                <Form.Label className="formIcon"><GiPayMoney /></Form.Label>
                <Form.Control
                  className="formField"
                  type="text"
                  placeholder="Enter penalty"
                  name="penalty"
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="due_date" className="addForm">
                <Form.Label className="formIcon"><RiCalendarTodoFill /></Form.Label>
                <Form.Control
                  className="formField"
                  type="date"
                  name="due_date"
                  onChange={handleInputChange}
                />
              </Form.Group>
              <br />
              <Modal.Footer className="modalbtn">
                <Button className="primarybtn" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
                <Button className="secondarybtn" type="submit">
                  Save
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
        {/* ADD MODAL END*/}

        {/* UPLOAD MODAL START */}
        <Modal show={showUploadModal} onHide={() => setShowUploadModal(false)}>
          <br/>
          <h1 className="text-divider">Upload CSV</h1>
          <Modal.Body>
            <Form onSubmit={handleUploadFormSubmit}>
              <Form.Group controlId="unit_upload" className="addForm">
                <Form.Label className="formIcon"><BsFiletypeCsv /></Form.Label>
                <Form.Control
                  className="formField"
                  type="file"
                  placeholder="Upload CSV"
                  name="assdue_upload"
                  onChange={handleInputChange}
                />
              </Form.Group>
              <br />
              <Modal.Footer className="modalbtn">
                <Button className="primarybtn" onClick={() => setShowUploadModal(false)}>
                  Cancel
                </Button>
                <Button className="secondarybtn" type="submit">
                  Save
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
        {/* UPLOAD MODAL END */}

        {/* EDIT MODAL START */}
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <br/>
          <h1 className="text-divider">Edit Due</h1>
          <Modal.Body>
            <Form onSubmit={handleUpdateSubmit}>
              <Form.Group controlId="invoice_num" className="addForm">
                <Form.Label className="formIcon"><MdNumbers /></Form.Label>
                <Form.Control
                  className="formField"
                  type="text"
                  placeholder="Enter invoice number"
                  name="invoice_num"
                  value={formData.invoice_num}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="unit_num" className="addForm">
                <Form.Label className="formIcon"><MdNumbers /></Form.Label>
                <Form.Control
                  className="formField"
                  type="text"
                  placeholder="Enter unit number"
                  name="unit_num"
                  value={formData.unit_num}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="billed_to" className="addForm">
                <Form.Label className="formIcon"><GiReceiveMoney /></Form.Label>
                <Form.Control
                  className="formField"
                  type="text"
                  placeholder="Enter billed to"
                  name="billed_to"
                  value={formData.billed_to}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="bill_cost" className="addForm">
                <Form.Label className="formIcon"><GiMoneyStack /></Form.Label>
                <Form.Control
                  className="formField"
                  type="text"
                  placeholder="Enter bill cost"
                  name="bill_cost"
                  value={formData.bill_cost}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="discount" className="addForm">
                <Form.Label className="formIcon"><RiCalendarTodoFill /></Form.Label>
                <Form.Control
                  className="formField"
                  type="date"
                  name="discount"
                  value={formData.discount}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="penalty" className="addForm">
                <Form.Label className="formIcon"><GiPayMoney /></Form.Label>
                <Form.Control
                  className="formField"
                  type="text"
                  placeholder="Enter penalty"
                  name="penalty"
                  value={formData.penalty}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="due_date" className="addForm">
                <Form.Label className="formIcon"><RiCalendarTodoFill /></Form.Label>
                <Form.Control
                  className="formField"
                  type="date"
                  name="due_date"
                  value={formData.due_date}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <br />
              <Modal.Footer className="modalbtn">
                <Button className="primarybtn" onClick={() => setShowEditModal(false)}>
                  Cancel
                </Button>
                <Button className="secondarybtn" type="submit">
                  Save
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
        {/* EDIT MODAL END*/}

        {/* DELETE MODAL START*/}
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} className="deleteModal">
          <br/>
          <h1 className="text-divider">Delete Due</h1>
          <Modal.Body>
            <p className="confirmation">Are you sure you want to delete this billing?</p>
          </Modal.Body>
          <Modal.Footer className="modalbtn">
            <Button className="primarybtn" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button className="secondarybtn" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
        {/* DELETE MODAL END */}
      </div>
    </div>
  );
};

export default AssocDueList;