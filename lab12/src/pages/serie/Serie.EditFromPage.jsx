import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import HeaderComponent from "../../components/HeaderComponent";

const initData = {
  name: "",
  description: "",
  category: "",
  img: ""
};

function SerieFormEditPage() {
  const urlApiSeries = "http://127.0.0.1:8000/series/api/v1series/";
  const urlApiCategories = "http://127.0.0.1:8000/series/api/v1categories/";
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(initData);
  const [categories, setCategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const setDataForm = async () => {
    const [serieResp, categoriesResp] = await Promise.all([
      axios.get(`${urlApiSeries}${id}/`),
      axios.get(urlApiCategories)]);
    setData(serieResp.data);
    setCategories(categoriesResp.data);
    setImagePreview(serieResp.data.img);
  };

  const onChangeNombre = (e) => {
    setData({ ...data, name: e.target.value });
  };

  const onChangeDescription = (e) => {
    setData({ ...data, description: e.target.value });
  };

  const onChangeCategory = (e) => {
    setData({ ...data, category: e.target.value });
  };

  const onChangeImg = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => formData.append(key, value));
        if (imageFile) formData.append("img", imageFile);
        await axios.put(`${urlApiSeries}${id}/`, formData);
        navigate("/series");
    };
  useEffect(() => {
    setDataForm();
  }, []);

  return (
    <>
      <HeaderComponent />
      <div className="container mt-3">
        <div className="border-bottom pb-3 mb-3">
          <h3>Editar - Serie</h3>
        </div>
        <form onSubmit={handleSubmit} className="row">
          <div className="col-md-4">
            <img
              className="card-img-top"
              src={imagePreview || "https://via.placeholder.com/300x200?text=Sin+imagen"}
              alt="preview"
              style={{ height: "200px", objectFit: "cover", width: "100%" }}
            />
          </div>
          <div className="col-md-8">
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input type="text" className="form-control" value={data.name} onChange={onChangeNombre} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <textarea className="form-control" value={data.description} onChange={onChangeDescription} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Categoría</label>
              <select className="form-select" value={data.category} onChange={onChangeCategory} required>
                <option value="">Seleccione una categoría</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.description}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Cambiar Imagen</label>
              <input type="file" className="form-control" accept="image/*" onChange={onChangeImg} />
            </div>
            <div className="mb-3">
              <button className="btn btn-primary me-2">Guardar</button>
              <Link className="btn btn-secondary" to="/series">Cancelar</Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default SerieFormEditPage;
