import { html, LitElement } from 'lit-element';
import moment from 'moment';
import 'moment/locale/cs';
import 'moment/locale/de';
import 'moment/locale/fr';
import 'moment/locale/it';
import 'moment/locale/nl';
import 'moment/locale/ru';
import { district_details_api_call } from './api';
// import { rain_level_icons } from './components/rain_level_cons';
import main from './styles/main.css';
import style__placeholder_loading from './styles/placeholder-loading.css';
import style__typography from './styles/typography.css';
// import { render__rain_number, render__rain_perc } from './utils';

const WEATHER_ICON_SVG_PATH = `https://www.suedtirol.info/static/img/weatherIcons`;

class MeteoForecast extends LitElement {
  constructor() {
    super();
    this.language_translation = 'en';
    this.token = `iJ9gIQJ-LFaNT2m-R_dazqCf2XoXO8trlqZsgN6ENAMD9lrWsdKKxoOYkHdNQt9UAUJlMosEiF-njEUtoNwT3V6AtIt08bxrLa0DKLJYroj54I_C1kCPiWV69KR1IXUZj18av-nuofuYDzpE8jRYL02SI97jHEGWfnRLNOfLyEsp3pAp17rm-p6hst-t7Z0bYJkIqFvERMd4QHshaRvAb89EUPb_zEHj1JwgBUOwFIHf0e8Bm-1-nL8d9o9AIEGGDAIiJfvjGmNT-54vteKx1E_r7liUDuXfL0pctOpu5w5Mb_yBmnJsDGFjq7YHVL9dIqZzUvXnRXq1x4novqquK0jiEXRI3XxQN-qKuMpYQ8XqsXQWTjWqoGqgqbIGYpRXMcAUvO-6Y7SSKKvtMLvXGZjlC_IA0TMvF2r8JQbfluFk2XzKs7sqIu6OCxWT4Xxn8U2NWFtKXK4RkfXP9zOMP4FtTfz-X3kgwwgWuUnFvbufk9xRF8nNwqsxgwedNtnw0ouzarOI3zUFRg0dBKJse1z-_rGkF4QvTWwzGG17LPs`;
    this.base_url = `https://tourism.opendatahub.bz.it/api/Weather`;
    this.district_details = {};
    this.is_loading = true;
    this.selected_district_id = 0;
    this.forecast_days = 5;

    this.district_details_api_call = district_details_api_call.bind(this);
  }
  static get properties() {
    return {
      selected_district_id: { type: Number },
      language_translation: { type: String },

      // Internal variables
      district_details: { type: Array },
      is_loading: { type: Boolean },
      forecast_days: { type: Number }
    };
  }

  async firstUpdated() {
    await this.district_details_api_call(this.selected_district_id);
    this.is_loading = false;
  }

  render() {
    moment.locale(this.language_translation);
    const { BezirksForecast, DistrictName } = this.district_details;
    let slice_of_bezirksforecast = BezirksForecast ? BezirksForecast.slice(1, this.forecast_days + 1) : [];

    return html`
      <style>
        ${style__placeholder_loading}
        ${main}
        ${style__typography}
      </style>
      <div class="meteo_widget">
        <h1>${DistrictName}</h1>
        <div class="forecast">
          ${slice_of_bezirksforecast.map(({ date, WeatherCode, MinTemp, MaxTemp }) => {
            return html`
              <div class="forecast__item">
                <p class="forecast__item__day">
                  ${moment(date).format(this.language_translation === 'de' ? 'dddd, DD.MM.YYYY' : 'dddd, DD/MM/YYYY')}
                </p>
                <img src="${WEATHER_ICON_SVG_PATH}/${WeatherCode}.svg" class="forecast__item__icon" />
                <p class="forecast__item__temp"><span>${MaxTemp}</span> / ${MinTemp}°C</p>
              </div>
            `;
          })}
        </div>
      </div>
    `;
  }
}

/* <img class="forecast__item__rain_icon" src="${rain_icon_path}" />  */

if (!window.customElements.get('meteo-forecast-widget')) {
  window.customElements.define('meteo-forecast-widget', MeteoForecast);
}
