
import React from 'react';
import { useState, useRef } from 'react';
import '../styles/form.css';
import { useEffect } from 'react';
import { BsCheck2 } from "react-icons/bs";

const Form = () => {


  const [datos, setDatos] = useState({
    todo: '',
    estado: false,
    id :  Date.now(),
    colorBoton : '',
    styleBoton : '',
    iconBoton : ''
  });

  const [data, setData] = useState([]);

  const form = useRef(null)

    const handleChange = (e) => {
      e.preventDefault()
      datos.id = Date.now()
      setDatos(datos)
      setData((old) => [...old, datos])

      if(datos.colorBoton == true){
        datos.styleBoton = 'ediBoton'
        datos.iconBoton = <BsCheck2 />
      }else {
        datos.styleBoton = ''
        datos.iconBoton = ''
      }

      form.current.reset()
    }

    useEffect(() => {
      if(localStorage.getItem('pendiente')) {
        setData(JSON.parse(localStorage.getItem('pendiente')))
      }
    },[])

    useEffect(() => {
      localStorage.setItem('pendiente', JSON.stringify(data))
   },[data])

   const boton = useRef(null);

   const handleClick = (e) => {
    datos.colorBoton = boton.current.classList.toggle('ediBoton')
    // console.log(datos.colorBoton)
   }


  //  limpiar localStoerange
  const handleClear = () => {
    localStorage.clear();
  }

  return (
    <section className='contenedorForm'>
          <div className='formulario'>
            <button ref={boton} value={true} onClick={(e) => handleClick(e)} className={`circleUno`}></button>
            <form ref={form} onSubmit={handleChange}>
                <input 
                    type="text"
                    placeholder='Create a new todo'
                    className='input'
                    onChange={(e) => setDatos({...datos, todo : e.target.value})}
                />
            </form>
          </div>

        <div className="contenedorData">

          {
            data.map((item, index) => (

              <div key={index}>
                <div className="estiloTodo">
                  <button className={`circle ${item.styleBoton}`}>
                    <i>{item.iconBoton}</i>
                  </button>
                  <a  
                    className='ancla'
                    href=''>{item.todo}
                  </a>
                </div>
                <hr />
              </div>
            ))
          }
        </div>
          <article>
            <div className='filtro'>
              <a href="">5 items left</a>
              <a onClick={handleClear} className='completed' href="">Clear completed</a>
            </div>
            <div className='filtrado'>
              <a href="">All</a>
              <a className='active' href="">Active</a>
              <a href="">Completed</a>
            </div>
          </article>
    </section>
  )
}

export default Form