import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import HeaderComponent from "../../components/HeaderComponent";

const initData = {
  name: '',
  description: '',
  category: '',
  img: '', 
};

function SerieFormPage() {
  const urlApiSeries = 'http://127.0.0.1:8000/series/api/v1series/';
  const urlApiCategories = 'http://127.0.0.1:8000/series/api/v1categories/';
  const navigate = useNavigate();
  const [data, setData] = useState(initData);
  const [categories, setCategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const dataCategories = async () => {
      const resp = await axios.get(urlApiCategories);
      console.log(resp.data);
      setCategories(resp.data);
  };

  useEffect(() => {
    dataCategories();
  }, [])

  const onChangeNombre = (e) =>{
    const nData={ ...data, name: e.target.value }
    setData(nData);
  };

  const onChangeDescription = (e) =>
    {const nData={ ...data, description: e.target.value }
    setData(nData);
  };

  const onChangeCategory = (e) => {
    const nData = { ...data, category: e.target.value }
    setData (nData);
  };

  const onChangeImg = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) setImagePreview(URL.createObjectURL(file));
    else setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));
    if (imageFile) formData.append("img", imageFile);
    await axios.post(urlApiSeries, formData);
    navigate("/series");
  };


  return (
    <>
      <HeaderComponent />
      <div className="container mt-3">
        <div className="border-bottom pb-3 mb-3">
          <h3>Nueva - Serie</h3>
        </div>
        <form onSubmit={handleSubmit} className="row">
          <div className="col-md-4">
            <img
              className="card-img-top"
              src={imagePreview || "https://dummyimage.com/400x250/000/fff&text="}
              alt="preview"
              style={{ height: "200px", objectFit: "cover", width: "100%" }}
            />
          </div>
          <div className="col-md-8">
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                onChange={onChangeNombre}
                value={data.name}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <textarea
                className="form-control"
                onChange={onChangeDescription}
                value={data.description}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Categoría</label>
              <select
                className="form-select"
                onChange={onChangeCategory}
                value={data.category}
                required
              >
                <option value="">Seleccione una categoría</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.description}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Imagen</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={onChangeImg}
                required
              />
            </div>
            <div className="mb-3">
              <button className="btn btn-primary me-2" type="submit"> Guardar
              </button> <Link className="btn btn-secondary" to="/series"> Cancelar </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default SerieFormPage;
