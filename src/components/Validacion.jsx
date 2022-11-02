import { useState } from "react"
import { useRef } from "react"
import { useEffect } from "react"
import '../styles/validacion.css'
import imagen from '../img/undraw_Team_up_re_84ok.png'

const Validacion = ({data}) => {

    const [estado, setEstado] = useState();
    const estadoTitulo = useRef(null);
    const cantidadLocal = function(){
        if(data.length === 0){
            estadoTitulo.current.innerHTML = 'Actualmente sin Tareas'
            setEstado(<img className="imgEstado" src={imagen} alt="" />)
          console.log('local vacio')
        }else {
            estadoTitulo.current.innerHTML = ''
            setEstado()
          console.log('hay en el local una cantidad de ', localStorage.length)
        }
        console.log(data)
      }

    useEffect(() => {
        cantidadLocal()
    },[data])
    return(
        <div>
            <h2 ref={estadoTitulo} className="tituloEstado"></h2>
           {estado}
        </div>
    )
}

export default Validacion
