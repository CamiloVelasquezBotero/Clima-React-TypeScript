import { useState } from 'react'
import type { SearchType } from '../../types'
import { countries } from '../../data/countries'
import styles from './Form.module.css'
import Alert from '../Alert/Alert'

type FormProps = {
    fetchWeather: (search: SearchType) => Promise<void>
}

export default function Form({fetchWeather}:FormProps) {
    const [search, setSearch] = useState<SearchType>({
        city: '',
        country: ''
    })
    const [alert, setAlert] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setSearch({
            ...search,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(Object.values(search).includes('')) { /* COmprobamos que no esten vacios */
            setAlert('Todos los campos son obligatorios')
            return
        }
        setAlert('')
        fetchWeather(search)
    }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
        {alert && <Alert>{alert}</Alert>} {/* Alerta de comprobacion */}
        <div className={styles.field}>
            <label htmlFor="city">Ciudad:</label>
            <input 
                id='city'
                type="text" 
                name='city'
                placeholder='Ciudad'
                value={search.city}
                onChange={handleChange}
            />
        </div>
        <div className={styles.field}>
            <label htmlFor="country">Pais:</label>
            <select
                id='country'
                name='country'
                value={search.country}
                onChange={handleChange}
            >
                <option value="">-- Seleccione un Pais --</option>
                {countries.map(countrie => (
                    <option
                        key={countrie.code}
                        value={countrie.code}
                    >{countrie.name}</option>
                ))}
            </select>
        </div>

        <input className={styles.submit} type="submit" value={'Consultar Clima'} />
    </form>
  )
}
