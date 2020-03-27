/* eslint-disable eqeqeq */
import React from 'react'
import Info  from './components/info'
import Form  from './components/form'
import Weather  from './components/weather'

const API_KEY = "31a2757d4c859a83cf2899d9a295dcb5";

// api.openweathermap.org/data/2.5/weather?q=Kiev,ua&appid=31a2757d4c859a83cf2899d9a295dcb5&units=metric

class App extends React.Component {

  state = {
    temp: '',
    city: '',
    country: '',
    pressure: '',
    sunset: '',
    error: ''
  }

  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    
    if(city) {
      const api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      const data = await api_url.json();

      if (data.cod == '200') {
        let sunset = data.sys.sunset;
        let date = new Date();
        date.setTime(sunset);
        let sunset_date = date.getHours() + ':' + date.getMinutes() + ":" + date.getSeconds();
  
        this.setState({
          temp: data.main.temp,
          city: data.name,
          country: data.sys.country,
          pressure: data.main.pressure,
          sunset: sunset_date,
          error: undefined
        });
      } else if (data.cod == '404' && data.message == 'city not found') {
        this.setState({
          temp: undefined,
          city: undefined,
          country: undefined,
          pressure: undefined,
          sunset: undefined,
          error: "Город не найден"
        });
      }

      
    } else {
      this.setState({
        temp: undefined,
        city: undefined,
        country: undefined,
        pressure: undefined,
        sunset: undefined,
        error: "Введите город"
      });
    }
  }

 
  render() {
    return (
      <div className="wrapper">
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="col-sm-5 info">
                <Info></Info>
              </div>
              <div className="col-sm-7 form">
                <Form getWeather = {this.getWeather}></Form>
                <Weather
                  temp     = {this.state.temp}
                  city     = {this.state.city}
                  country  = {this.state.country}
                  pressure = {this.state.pressure}
                  sunset   = {this.state.sunset}
                  error    = {this.state.error}
                ></Weather>
              </div>
            </div>
          </div>
        </div>
        
       
      </div>
    );
  }
}

export default App;


