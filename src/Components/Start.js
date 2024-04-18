import React from "react";
import { useNavigate } from "react-router-dom";

export default function Start() {
  const navigate = useNavigate();
  function handleSelectShadow() {
    localStorage.setItem("choice", document.getElementById("shadowSelect").value);
    navigate("/shadowmatching");
  }
  function handleShape() {
    navigate("/shapematching");
  }
  return (
    <div className="mt-5">
      <select id="shadowSelect" onChange={handleSelectShadow} className="btn btn-primary me-2">
        <option defaultValue className="btn btn-dark">Shadow Matching (Drag and Drop)</option>
        <option value="animals"className="btn btn-dark">Animals</option>
        <option value="cars"className="btn btn-dark">Cars</option>
      </select>
      <button className="btn btn-primary me-2" onClick={handleShape}>Shape Matching (Click)</button>
    </div>
  );
}
