import React from "react";
import * as _ from "lodash";
import Dialog from "material-ui/Dialog";
import { notify } from "src/services/notify";
import { getToken } from "src/services/generic";
import { CONFIG } from "src/config/index";
import style from "src/styles/inventory/viewUser.scss";
import FlatButton from "material-ui/FlatButton";
import UploadImageComp from "../../uploadImageCompressed/UploadImageComp";

export default class DialogUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory_id: this.props.inventory_id,
      token: "",
      file_upload_action: "inventory_files",
      inventory_invoice: "",
      inventory_warranty: "",
      inventory_photo: "",
      page_url: window.location.href,
      document: "",
      file: []
    };
    this.handleFileChange = this.handleFileChange.bind(this);
    this.callUpdateDocuments = this.callUpdateDocuments.bind(this);
  }
  componentWillReceiveProps(props) {
    this.setState({
      token: getToken()
    });
  }

  handleClose = () => {
    this.setState({ open: false });
  };
  handleFileChange(e) {
    this.setState({ file: Array.from(e.target.files) });
    const file = this.refs.file.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      this.setState({
        imageUrl: reader.result
      });
    };
    if (file) {
      reader.readAsDataURL(file);
      this.setState({
        imageUrl: reader.result
      });
    } else {
      this.setState({
        imageUrl: ""
      });
    }
  }

  callUpdateDocuments(e) {
    let link1 = this.refs.status.value;
    let stop = false;
    let document = this.state.document;
    if (document === "") {
      stop = true;
      notify("Warning!", "Please select document type.", "warning");
    } else if (link1 === "") {
      stop = true;
      notify("Warning!", "Please select a file", "warning");
    }

    if (stop) {
      e.preventDefault();
    }
  }
  handleInlargePhoto() {
    this.setState({
      open: true,
      open3: true,
      open2: false,
      open1: false
    });
  }
  handleInlargeInvoice() {
    this.setState({
      open: true,
      open3: false,
      open2: true,
      open1: false
    });
  }
  handleInlargeWarranty() {
    this.setState({
      open: true,
      open3: false,
      open2: false,
      open1: true
    });
  }
  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const machineList = _.concat(
      this.props.manageDevice.device,
      this.props.manageDevice.unapprovedList.data
    );
    const machineName = _.filter(machineList, {
      id: this.props.inventory_id
    });
    const fileInventoryPhoto = _.isEmpty(machineName)
      ? null
      : machineName[0].fileInventoryPhoto;
    const fileInventoryWarranty = _.isEmpty(machineName)
      ? null
      : machineName[0].fileInventoryWarranty;
    const fileInventoryInvoice = _.isEmpty(machineName)
      ? null
      : machineName[0].fileInventoryInvoice;

    const actions = [
      <FlatButton label="Close" primary={true} onClick={this.handleClose} />
    ];
    let path = CONFIG.view_inventory_documents;
    return (
      <div>
        <h2>Inventory Files</h2>
        <form
          action={CONFIG.inventory_upload_url}
          method="POST"
          encType="multipart/form-data"
        >
          <div className="form-group">
            {"Upload Documents"}
            <select
              className="form-control"
              ref="status"
              value={this.state.document}
              onChange={e => {
                               this.setState({
                                 document:
                                   e.target.value,
                                 file: []
                               });
                               this.refs.file.value = "";
                             }}
            >
              <option value="" disabled>
                --Select document--
              </option>
              <option value="inventory_photo">Photo</option>
              <option value="inventory_warranty">Warranty</option>
              <option value="inventory_invoice">Inovice</option>
            </select>
          </div>
          <div className="form-group">
            <label className="col-sm-12">Attachment </label>
            <input
              type="file"
              className="form-control"
              ref="file"
              name={this.state.document}
              multiple="multiple"
              onChange={this.handleFileChange}
            />
          </div>
        </form>
        <div className="form-group">
          {fileInventoryPhoto ? (
            <div>
              <label className="col-xs-12">Photo </label>
              <a href={path + fileInventoryPhoto} target="_blank" >
              <img
                src={path + fileInventoryPhoto}
                className="small"
              />
              </a>
              <br />
            </div>
          ) : null}
        </div>

        <div className="form-group">
          {fileInventoryWarranty ? (
            <div>
              <label className="col-xs-12">Warranty</label>
              <a href={path + fileInventoryWarranty} target="_blank" >
              <img
                src={path + fileInventoryWarranty}
                className="small"
              />
              </a>
              <br />
            </div>
          ) : null}
          
        </div>
        <div className="form-group">
          {fileInventoryInvoice ? (
            <div>
              <label className="col-xs-12">Invoice </label>
             <a href={path + fileInventoryInvoice} target="_blank" > <img
                src={path + fileInventoryInvoice}
                className="small"
              />
              </a>
              <br />
            </div>
          ) : null}
         
        </div>
        <div className="form-group">
          {this.state.file[0] ? (
            <div>
              <label className="col-xs-12">Image Preview </label>
              <img
                src={this.state.imageUrl}
                className="small"
              />
              <br />
            </div>
          ) : null}
        </div>
        <UploadImageComp
          callUpdateDocuments={this.callUpdateDocuments}
          url={CONFIG.inventory_upload_url}
          params={this.state}
          file={this.state.file[0]}
          fileName={this.state.document}
        />
      </div>
    );
  }
}
