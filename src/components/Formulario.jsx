import {useState, useEffect} from 'react'
import Error from './Error'

function Formulario({ paciente, pacientes, setPaciente,setPacientes }) {

  const [nombre, setNombre] = useState('')
  const [propietario, setPropietario] = useState('')
  const [email, setEmail] = useState('')
  const [fecha, setFecha] = useState('')
  const [sintomas, setSintomas] = useState('')

  const [error, setError] = useState(false)

  useEffect(() => {
    if(Object.keys(paciente).length > 0) {
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
    }
  }, [paciente])

  const generarId = () => {
    const fecha = Date.now().toString(36)
    const random = Math.random().toString(36).substr(2)
    return fecha + random
  }
  

  const handleSubmit = (e) => {
    e.preventDefault()

    if ([nombre, propietario, email, fecha, sintomas].includes('')) {
      setError(true)
      return
    }
    
    setError(false)

    const objetoPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas
    }

    if (paciente.id) {
      objetoPaciente.id = paciente.id
      const pacientesActualizados = pacientes.map(el => el.id === paciente.id ? objetoPaciente : el)
      setPacientes(pacientesActualizados)
      setPaciente({})
    } else {
      objetoPaciente.id = generarId()
      setPacientes([...pacientes, objetoPaciente])
    }

    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')
    
  }

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y {''}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form className="bg-white shadow-md rounded-lg py-10 px-5 mb-10" onSubmit={handleSubmit}>
        {error && (
          <Error mensaje="Todos los campos son obligatorios" />
        )}
        <div className="mb-5">
          <label className="block text-gray-700 uppercase font-bold" htmlFor="mascota">Nombre Mascota</label>
          <input
            type="text"
            id="mascota"
            value={nombre}
            placeholder="Nombre de la mascota"
            onChange={(e) => setNombre(e.target.value)}
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          />
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 uppercase font-bold" htmlFor="propietario">Nombre Propietario</label>
          <input
            type="text"
            id="propietario"
            value={propietario}
            placeholder="Nombre del propietario"
            onChange={(e) => setPropietario(e.target.value)}
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          />
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 uppercase font-bold" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            placeholder="Email contacto"
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          />
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 uppercase font-bold" htmlFor="fecha">Fecha de alta</label>
          <input
            id="fecha"
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          />
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 uppercase font-bold" htmlFor="sintomas">Sintomas</label>
          <textarea
            id="sintomas"
            value={sintomas}
            placeholder="Describe los sintomas"
            onChange={(e) => setSintomas(e.target.value)}
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          />
        </div>
        <input
          type="submit"
          value={paciente.id ? 'Editar paciente' : 'Agregar paciente'}
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all"
        />
      </form>
    </div>
  )
}

export default Formulario