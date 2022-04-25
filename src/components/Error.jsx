const Error = ({mensaje}) => {
    return ( 
        <div className='bg-red-800 text-white uppercase font-bold mb-3 text-center rounded-md p-3'>
            {mensaje}
        </div>
     );
}
 
export default Error;