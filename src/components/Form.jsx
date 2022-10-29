
import React from 'react';
import { useState } from 'react';
import '../styles/form.css';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';

const Form = () => {

  const [datos, setDatos] = useState({
    todo: '',
    estado: false,
    id :  uuidv4(),
    dafault: '123'
  });

  const [local, setLocal] = useState([]);
  const [data, setData] = useState([]);

    const handleChange = (e) => {

      
      e.preventDefault()
      datos.id = uuidv4()
      setDatos(datos)
      setData((old) => [...old, datos])
    }

    useEffect(() => {
      if(localStorage.getItem('pendiente')) {
        setData(JSON.parse(localStorage.getItem('pendiente')))
      }
    },[])

    useEffect(() => {
      localStorage.setItem('pendiente', JSON.stringify(data))
   },[data])

   const handleClick = (e) => {
    console.log('siiii', e.target.value)
   }

  return (
    <section className='contenedorForm'>
          <div className='formulario'>
            <button value={true} onClick={(e) => handleClick(e)} className='circleUno'></button>
            <form onSubmit={handleChange}>
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
                  <button className='circle'>
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
              <a className='completed' href="">Clear completed</a>
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