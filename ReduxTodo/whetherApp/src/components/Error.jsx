import {useSelector} from 'react-redux'
import '../App.css'
export default function Error({message}) {
  const { error } = useSelector((state) => state.weather)
  return error ? <p className="error">{message}</p> : null
}