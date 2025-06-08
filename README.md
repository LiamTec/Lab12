# 🎬 Aplicación de Gestión de Series

Esta es una aplicación full-stack desarrollada con **React** en el frontend y **Django + Django REST Framework** en el backend. Permite gestionar series, incluyendo su **nombre**, **descripción**, **categoría** y una **imagen** asociada.

---

## 🚀 Tecnologías Usadas

### Frontend
- React 18+
- React Router DOM
- Axios
- Bootstrap (CDN)

### Backend (Django)
- Django 5.2.1
- Django REST Framework
- django-cors-headers
- Pillow (para imágenes)

---

## 🧰 Funcionalidades

- 📄 Listar series
- ➕ Crear nueva serie (con formulario y subida de imagen)
- 🖊️ Editar serie existente
- ❌ Eliminar series
- 📂 Asociar cada serie a una categoría
- 📸 Vista previa de imagen al subir
- 🗃️ Listado y edición de categorías

---

## 🚀 Cómo ejecutar el proyecto

### 1. Clonar el repositorio

    git clone https://github.com/LiamTec/Lab12
    cd Lab12

### 2. Backend - Django
  
    cd djangoApp

  Crear y activar entorno virtual
  
    python -m venv venv
    venv\Scripts\activate
    cd lab08
  
  Instalar dependencias
  
    pip install -r requirements.txt
  
  Migraciones y ejecución
  
    python manage.py migrate
    python manage.py runserver
    
### 3. Frontend - React

    cd lab12

  Instalar dependencias
  
    npm install
  
  Ejecutar el servidor de desarrollo
  
    npm run dev
    
##  🌐 Rutas principales

  ### Django

  Series : http://127.0.0.1:8000/series/api/v1series/

  Categories : http://127.0.0.1:8000/series/api/categories/
  
  ### React
  
  /series – Listado de series
  
  /series/new – Crear nueva serie
  
  /series/edit/:id – Editar serie existente
  
  /categories – CRUD de categorías

  /categories/new - Crear nueva categoria

  /categories/edit/:id - Editar categoria existente

## 👨‍💻 Autores

  ### Alessandro y Liam 


