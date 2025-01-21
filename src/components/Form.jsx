import { useState, useEffect } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
    category: "",
    tags: [],
    published: false,
  });

  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    if (formData.published) {
      alert("Hai scelto di pubblicare l'articolo!");
    }
  }, [formData.published]);

  const handlerSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim()) {
      if (isEditing) {
        const updatedList = list.map((item, i) =>
          i === editIndex ? formData : item
        );
        setList(updatedList);
        setIsEditing(false);
        setEditIndex(null);
      } else {
        setList([...list, formData]);
      }
      setFormData({
        title: "",
        content: "",
        image: "",
        category: "",
        tags: [],
        published: false,
      });
    }
  };

  const handlerDelete = (index) => {
    const newList = list.filter((item, i) => i !== index);
    setList(newList);
  };

  const handlerEdit = (index) => {
    setFormData(list[index]);
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
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>

      <div>
        <label className="form-label">Contenuto</label>
        <textarea
          className="form-control"
          placeholder="contenuto"
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
        />
      </div>

      <div>
        <label className="form-label">Immagine (URL)</label>
        <input
          type="text"
          className="form-control"
          placeholder="URL immagine"
          value={formData.image}
          onChange={(e) =>
            setFormData({ ...formData, image: e.target.value })
          }
        />
      </div>

      <div>
        <label className="form-label">Categoria</label>
        <select
          className="form-control"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
        >
          <option value="">Seleziona una categoria</option>
          <option value="tecnologia">Tecnologia</option>
          <option value="scienza">Scienza</option>
          <option value="arte">Arte</option>
        </select>
      </div>

      <div>
        <label className="form-label">Tag</label>
        <div>
          <label>
            <input
              className="m-3"
              type="checkbox"
              value="JavaScript"
              checked={formData.tags.includes("JavaScript")}
              onChange={(e) => {
                const tags = formData.tags.includes(e.target.value)
                  ? formData.tags.filter((tag) => tag !== e.target.value)
                  : [...formData.tags, e.target.value];
                setFormData({ ...formData, tags });
              }}
            />
            JavaScript
          </label>
          <label>
            <input
              className="m-3"
              type="checkbox"
              value="React"
              checked={formData.tags.includes("React")}
              onChange={(e) => {
                const tags = formData.tags.includes(e.target.value)
                  ? formData.tags.filter((tag) => tag !== e.target.value)
                  : [...formData.tags, e.target.value];
                setFormData({ ...formData, tags });
              }}
            />
            React
          </label>
        </div>
      </div>

      <div>
        <label className="form-label">Pubblicato</label>
        <input
          className="m-3"
          type="checkbox"
          checked={formData.published}
          onChange={(e) =>
            setFormData({ ...formData, published: e.target.checked })
          }
        />
      </div>

      <button type="submit" className="btn btn-primary m-3">
        {isEditing ? "Modifica" : "Invia"}
      </button>

      <ul className="list-group">
        {list.map((item, index) => (
          <li key={index} className="list-group-item">
            <h5>{item.title}</h5>
            <p>{item.content}</p>
            <p>
              <strong>Categoria:</strong> {item.category}
            </p>
            <p>
              <strong>Tags:</strong> {item.tags.join(", ")}
            </p>
            <p>
              <strong>Pubblicato:</strong> {item.published ? "Sì" : "No"}
            </p>
            {item.image && (
              <img
                src={item.image}
                alt="articolo"
                style={{ width: "100px" }}
              />
            )}
            <div>
              <span className="delete m-3" onClick={() => handlerDelete(index)}>
                ❌
              </span>
              <span className="edit m-3" onClick={() => handlerEdit(index)}>
                ✏️
              </span>
            </div>
          </li>
        ))}
      </ul>
    </form>
  );
};

export default Form;
