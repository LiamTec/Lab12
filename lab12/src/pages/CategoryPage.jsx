import { useState , useEffect } from 'react';
import { Link , useNavigate} from 'react-router-dom'
import axios from "axios";
import HeaderComponent from "../components/HeaderComponent.jsx";


function CategoryPage(){
  const urlApi = 'http://127.0.0.1:8000/series/api/v1categories/'
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const localData = async () => {
    const resp = await axios.get(urlApi);
    console.log(resp.data);
    setCategories(resp.data)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Esta seguro de eliminar este registro')){
      await axios.delete(`${urlApi}${id}/`);
      const nLista = categories.filter(item=>item.id!=id);
      setCategories(nLista)
    }
  }

  const handleEdit = async (id) => {
    navigate(`/categories/edit/${id}`);
  };

  useEffect (() => {
    localData();
  }, [])
      
      return (
        <>
            <HeaderComponent />
            <div className="container mt-3">
                <div className="border-bottom pb-3 mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                  <h3>Categorías</h3>
                  <div>
                    <Link className="btn btn-primary" to="/categories/new">
                      Nuevo
                    </Link>
                  </div>
                </div>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th className="text-center">Id</th>
                            <th className="text-center" style={{width: "100px"}}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((item)=>(
                            <tr key={item.id}>
                                <td>{item.description}</td>
                                <td className="text-center">{item.id}</td>
                                <td className="text-center">
                                    <button onClick={() => handleEdit (item.id)} className="btn btn-secondary me-2 btn-sm">
                                        <i className="bi bi-pencil-square"></i>
                                    </button> 
                                    <button onClick={() => handleDelete(item.id)} className="btn btn-danger btn-sm">
                                        <i className="bi bi-trash-fill"></i>
                                    </button> 
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
      )
}


export default CategoryPage
