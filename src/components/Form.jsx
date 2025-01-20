import { useState } from "react";

const Form = () => {

  const [formData, setFormData] = useState({
    title: "",
  });

  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handlerSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim()) {
      if (isEditing) {
        const updatedList = list.map((item, i) =>
          i === editIndex ? formData.title : item
        );
        setList(updatedList);
        setIsEditing(false);
        setEditIndex(null);
      } else {
        setList([...list, formData.title]);
      }
      setFormData({
        title: ""
      });
    }
  };

  const handlerDelete = (index) => {
    const newList = list.filter((item, i) => i !== index);
    setList(newList);
  };

  const handlerEdit = (index) => {
    setFormData({
      title: list[index],
    });
    setIsEditing(true);
    setEditIndex(index);
  };

  return (
    <form className="container mt-5" onSubmit={handlerSubmit}>
      <div>
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          placeholder="title"
          value={formData.title}
          onChange={(e) =>
            setFormData({
              title: e.target.value,
            })
          }
        />
      </div>

      <button type="submit" className="btn btn-primary m-3">
        {isEditing ? "Modifica" : "Invia"}
      </button>

      <ul className="list-group">
        {list.map((item, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between">
            <span>{item}</span>
            <div>
              <span className="delete m-3" onClick={() => handlerDelete(index)}> ❌ </span>
              <span className="edit m-3" onClick={() => handlerEdit(index)}> ✏️ </span>
            </div>
          </li>
        ))}
      </ul>
    </form >
  );
};

export default Form;
