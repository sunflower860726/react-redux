import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import "react-date-picker/index.css";
import { CONFIG } from "src/config/index";


let path = CONFIG.inventory_images;
const DeviceDetails = ({ userAssignMachine, unassignDevice, loggedUser }) => {
  let machineList = _.map(userAssignMachine, (val, i) => {
    return (
      <tr key={i}>
        <td>
          {val.id}
          <br />
          <br />
          {val.fileInventoryPhoto ? (
            <a className="thumbnail">
              <img src={path + val.fileInventoryPhoto} />
            </a>
          ) : null}
        </td>
        <td>{val.machine_type}</td>
        <td>{val.machine_name}</td>
        <td>{val.bill_number}</td>
        <td>{val.serial_number}</td>
        <td>{val.assign_date}</td>
        <td style={{ textAlign: "center" }}>
          {loggedUser.data.role === "Admin" ? (
            <i
              className="fa fa-lg fa fa-trash"
              onClick={() => unassignDevice(val)}
              aria-hidden="true"
              style={{
                color: "rgb(183, 28, 28)",
                textAlign: "center",
                cursor: "pointer"
              }}
            />
          ) : null}
        </td>
      </tr>
    );
  });
  if (_.isEmpty(machineList)) {
    machineList = (
      <tr>
        <td colSpan="5">
          <h5 className="text-center text-danger">{"Device Not Asssigned"}</h5>
        </td>
      </tr>
    );
  }

  return (
    <div className="row no-gutter box">
      <h6 className="text-center">Assigned Device Details</h6>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Device Type</th>
              <th>Name</th>
              <th>Excellence Bill Number</th>
              <th>Serial Number</th>
              <th>Assign Date</th>
              {loggedUser.data.role === "Admin" ? (
                <th style={{ textAlign: "center" }}>Unassign</th>
              ) : null}
            </tr>
          </thead>
          <tbody>{machineList}</tbody>
        </table>
      </div>
    </div>
  );
};

DeviceDetails.propTypes = {
  userAssignMachine: PropTypes.array.isRequired
};

export default DeviceDetails;
