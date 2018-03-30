import React, { Component } from "react";
import ImageCompressor from "image-compressor.js";
import { notify } from "src/services/notify";

class UploadImageComp extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const file = this.props.file;
    const url = this.props.url;
    const doc_type = this.props.doc_type;

    if (!file) {
      return;
    } else if (!file.type.includes("image")) {
      fetch(url, {
        method: "POST",
        body: { file: file, doc_type: doc_type }
      }).then(data => {
        console.log(data);
        if (data.status === 200) {
          notify("Success !", "File uploaded successfully", "success");
        }
        console.log("success");
      });
    } else {
      let quality;

      if (file.size < 5000000 && file.size >= 4000000) {
        quality = 0.1;
      } else if (file.size < 4000000 && file.size >= 3500000) {
        quality = 0.3;
      } else if (file.size < 3500000 && file.size >= 3000000) {
        quality = 0.4;
      } else if (file.size < 3000000) {
        quality = 0.6;
      }

      new ImageCompressor(file, {
        quality: quality,
        success(result) {
          const formData = new FormData();
          formData.append("file", result, result.name);
          // Send the compressed image file to server with XMLHttpRequest.
          fetch(url, { method: "POST", body: formData }).then(data => {
            console.log(data);
            if (data.status === 200) {
              notify("Success !", "File uploaded successfully", "success");
            }
            console.log("success");
          });
        },
        error(e) {
          console.log(e.message);
        }
      });
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="submit"
            name="submit"
            value="Upload"
            className="col-xs-12 md-btn md-raised indigo"
            onClick={e => this.props.callUpdateDocuments(e)}
          />
        </form>
      </div>
    );
  }
}
export default UploadImageComp;
