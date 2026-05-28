import './Loader.css'
const loader = ({ message = 'Cargando productos (despertando al servidor (∪｡∪)｡｡｡zzz)' }) => {
  return (
    <div role='status' aria-live='polite' aria-busy='true'>
      <div className='loader' aria-hidden='true'>
        <span /><span /><span />
      </div>
      <span className='loader'>{message}</span>
    </div>
  )
}

export default loader
