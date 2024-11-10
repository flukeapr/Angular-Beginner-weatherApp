import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environments';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    RouterLink,
     CardModule, 
     ButtonModule,
      FormsModule,
      InputTextModule,
      IconFieldModule,
      InputIconModule,

    ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  
  cityName: string = '';
  public readonly weatherIcons = {
    clearDay : 'animated/cloudy-1-day.svg',
    cloudyDay : 'animated/cloudy.svg',
    rainyDay : 'animated/rainy-3.svg',
    snowDay : 'animated/snowy-3.svg',
    haze : 'animated/haze.svg',
    wind : 'animated/wind.svg',
  }
  public  weatherImages : any = {
    'Clouds': this.weatherIcons.cloudyDay,
    'Rain': this.weatherIcons.rainyDay,
    'Clear': this.weatherIcons.clearDay,
    'Snow': this.weatherIcons.snowDay
  }
  apiURL:string = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q='
  weatherData: any;
  temp: number = 0;
  humidity: number = 0;
  wind: number = 0;
  weather: string = '';
  onChange(event: string) {
    console.log(event);
  }
  async fetchWeather () {
     if(this.cityName === '' || this.cityName === null) return;
    try {
      const response = await fetch(`${this.apiURL}${this.cityName}&appid=${environment.API_KEY}`)
      const weatherData = await response.json()
      this.weatherData = weatherData;
      console.log(weatherData)
      this.temp = weatherData.main.temp.toFixed(0);
      this.humidity = weatherData.main.humidity;
      this.wind = weatherData.wind.speed;
      this.weather = weatherData.main.temp < 0 ? 'Snow' : weatherData.weather[0].main;
    } catch (error) {
      console.error(error)
    }
   
  }
}
