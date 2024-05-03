import React, { useState } from "react";
import Editor from "react-simple-wysiwyg";

const CreateBlog = () => {
  const [html, setHtml] = useState("my <b>HTML</b>");

  function onChange(e) {
    setHtml(e.target.value);
  }

  return (
    <div className="container mb-5">
      <div className="d-flex justify-content-between pt-5 mb-4">
        <h4>Blog</h4>
        <a href="/" className="btn btn-dark">
          Back
        </a>
      </div>
      <div className="card border-0 shadow-lg">
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="" className="form-label">
              Title
            </label>
            <input type="text" className="form-control" placeholder="Title" />
          </div>
          <div className="mb-3">
            <label htmlFor="" className="form-label">
              Title
            </label>
            <Editor
              containerProps={{ style: { height: "300px" } }}
              value={html}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="" className="form-label">
              Image
            </label>
            <input type="file" className="form-control" placeholder="Image" />
          </div>

          <div className="mb-3">
            <label htmlFor="" className="form-label">
              Author
            </label>
            <input type="text" className="form-control" placeholder="Author" />
          </div>

          <button className="btn btn-dark">Create</button>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
