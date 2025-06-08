import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import HeaderComponent from "../components/HeaderComponent";
import axios from "axios";

function SeriePage() {
  const urlApiSeries = "http://127.0.0.1:8000/series/api/v1series/";
  const urlApiCategories = "http://127.0.0.1:8000/series/api/v1categories/";
  const navigate = useNavigate();
  const [series, setSeries] = useState([]);
  const [categories, setCategories] = useState([]);

  const dataSeries = async () => {
      const resp = await axios.get(urlApiSeries);
      console.log(resp.data);
      setSeries(resp.data);
  };

  const dataCategories = async () => {
      const resp = await axios.get(urlApiCategories);
      console.log(resp.data);
      setCategories(resp.data);
  };

  useEffect(() => {
    dataSeries();
    dataCategories();
  }, []);

  const getCategoryDescription = (categoryId) => {
    const cat = categories.find((c) => c.id === categoryId);
    return cat ? cat.description : "Sin categoría";
  };

  const handleDelete = async (id) => {
    if (window.confirm('Está seguro de eliminar este registro?')) {
        await axios.delete(`${urlApiSeries}${id}/`);
        const nLista = series.filter(item=>item.id!=id);
        setSeries(nLista);
    }
  };

  const handleEdit = (id) => {
    navigate(`/series/edit/${id}`);
  };

  return (
    <>
      <HeaderComponent />
      <div className="container mt-3">
        <div className="border-bottom pb-3 mb-3">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3>Series</h3>
            <Link className="btn btn-primary" to="/series/new">
              Nuevo
            </Link>
          </div>
        </div>
        <div className="row">
          {series.map((serie) => (
            <div key={serie.id} className="col-md-3 mb-3">
              <div className="card">
                <img
                  className="card-img-top object-fit-cover"
                  src={serie.img}
                  alt={serie.name}
                  style={{ height: "200px", width: "100%", objectFit: "cover" }}/>
                <div className="card-body">
                  <h5 className="card-title">{serie.name}</h5>
                  <p className="card-text">{serie.description}</p>
                  <p className="card-text">{getCategoryDescription(serie.category)}</p>
                  <div className="d-flex justify-content-between">
                    <button onClick={() => handleEdit(serie.id)} className="btn btn-secondary">Editar </button>
                    <button onClick={() => handleDelete(serie.id)} className="btn btn-danger">Eliminar</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default SeriePage;
