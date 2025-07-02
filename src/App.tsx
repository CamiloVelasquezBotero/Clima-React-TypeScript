import styles from './App.module.css'
import useWeather from './hooks/useWeather'
import Form from './components/Form/Form'
import WeatherDeatil from './components/WeatherDeatil/WeatherDeatil'
import Spinner from './components/Spinner/Spinner'
import Alert from './components/Alert/Alert'

function App() {
  const { weather, loading, notFound, fetchWeather, hasWeatherData } = useWeather()

  return (
    <>
      <h1 className={styles.title}>Clima-react</h1>

      <div className={styles.container}>
        <Form fetchWeather={fetchWeather}/>

        {loading && <Spinner />}

        {/* Si encontramos datos... */}
        {hasWeatherData && <WeatherDeatil weather={weather} />}

        {notFound && <Alert>Ciudad No Encontrada</Alert>}
      </div>
    </>
  )
}

export default App
