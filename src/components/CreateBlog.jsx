import React, { useState } from "react";
import Editor from "react-simple-wysiwyg";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const [html, setHtml] = useState("my <b>HTML</b>");
  const [imageId, setImageId] = useState("");
  const navigate = useNavigate();

  function onChange(e) {
    setHtml(e.target.value);
  }

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("http://localhost:8000/api/save-temp-image", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();

    if (result.status == false) {
      alert(result.errors.image);
      e.target.value = null;
    }

    console.log("result.image.id", result.image.id);
    setImageId(result.image.id);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const formSubmit = async (data) => {
    const newData = { ...data, description: html, image_id: imageId };
    console.log(newData);

    const res = await fetch("http://localhost:8000/api/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });

    toast("Blog added successfully");

    navigate("/");
  };

  return (
    <div className="container mb-5">
      <div className="d-flex justify-content-between pt-5 mb-4">
        <h4>Blog</h4>
        <a href="/" className="btn btn-dark">
          Back
        </a>
      </div>
      <div className="card border-0 shadow-lg">
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="card-body">
            <div className="mb-3">
              <label htmlFor="" className="form-label">
                Title
              </label>
              <input
                {...register("title", { required: true })}
                type="text"
                className={`form-control ${errors.title && "is-invalid"}`}
                placeholder="Title"
              />
              {errors.title && (
                <span className="invalid-feedback">Title is Required</span>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="" className="form-label">
                Short Description
              </label>
              <textarea
                {...register("shortDescription")}
                className="form-control"
                rows={4}
              ></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="" className="form-label">
                Title
              </label>
              <Editor
                {...register("Description")}
                containerProps={{ style: { height: "300px" } }}
                value={html}
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="" className="form-label">
                Image
              </label>
              <input
                onChange={handleFileChange}
                type="file"
                className="form-control"
                placeholder="Image"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="" className="form-label">
                Author
              </label>
              <input
                type="text"
                {...register("author", { required: true })}
                className={`form-control ${errors.author && "is-invalid"}`}
                placeholder="Author"
              />

              {errors.author && (
                <span className="invalid-feedback">Author is Required</span>
              )}
            </div>

            <button className="btn btn-dark">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
