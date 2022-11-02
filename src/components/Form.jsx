
import React from 'react';
import { useState, useRef } from 'react';
import '../styles/form.css';
import { useEffect } from 'react';
import { BsCheck2 } from "react-icons/bs";
import Validacion from './Validacion';

const Form = () => {


  const [datos, setDatos] = useState({
    todo: '',
    estado: false,
    id :  Date.now(),
    colorBoton : '',
    styleBoton : '',
    iconBoton : '',
    subText : '',
    default : '123'
  });

  const [data, setData] = useState([]);

  const form = useRef(null)

    const handleChange = (e) => {
      e.preventDefault()
      datos.id = Date.now()
      setDatos(datos)
      setData((old) => [...old, datos])

      if(datos.estado == true){
        datos.styleBoton = 'ediBoton'
        datos.subText = 'ancla'
        datos.iconBoton = 'bi bi-check2'
      }else {
        datos.styleBoton = ''
        datos.subText = ''
        datos.iconBoton = ''
      }

      // console.log(data)

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
    datos.estado = boton.current.classList.toggle('ediBoton')
    // console.log(datos.colorBoton)
   }


  //  limpiar localStoerange
  const handleClear = () => {
    localStorage.removeItem('pendiente');
  }


  const handleActive = () => {
    setData(data.filter(item => item.estado));
    // console.log(fil)
  }


  const handleAll = () => {
    let fil = data.filter(e => e.default);
    console.log(fil)
  }

  const handleDelete = (id) => {
    setData(data.filter(e => e.id !== id))
  }


  return (
    <section className='contenedorForm'>
          <div className='formulario'>
            <button ref={boton} value={true} onClick={(e) => handleClick(e)} className={`circleUno`}><i className={datos.iconBoton}></i></button>
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

              <div className='key' key={index}>
                <div className="estiloTodo">
                  <button className={`circle ${item.styleBoton}`}>
                    <i className={item.iconBoton}></i>
                  </button>
                  <a  
                    className={`anclaUno ${item.subText}`}
                    href=''>{item.todo}
                  </a>
                  <a className='delete' onClick={() => handleDelete(item.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
                  </a>
                </div>
                <hr className='hr' />
              </div>
            ))
          }
          <Validacion data={data} />
        </div>
          <article>
            <div className='filtro'>
              <a href="">5 items left</a>
              <a onClick={handleClear} className='completed' href="">Clear completed</a>
            </div>
            <div className='filtrado'>
              <a onClick={handleAll}>All</a>
              <a onClick={handleActive} className='active'>Active</a>
              <a href="">Completed</a>
            </div>
          </article>
    </section>
  )
}

export default Form