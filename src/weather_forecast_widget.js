import { html, LitElement } from 'lit-element';
import moment from 'moment';
import 'moment/locale/cs';
import 'moment/locale/de';
import 'moment/locale/fr';
import 'moment/locale/it';
import 'moment/locale/nl';
import 'moment/locale/ru';
import { district_details_api_call } from './api';
import { API_BASE_PATH, API_TOKEN } from './constants';
import main from './styles/main.css';
import style__placeholder_loading from './styles/placeholder-loading.css';
import style__typography from './styles/typography.css';

const WEATHER_ICON_SVG_PATH = `https://www.suedtirol.info/static/img/weatherIcons`;

class WeatherForecast extends LitElement {
  constructor() {
    super();
    this.language_translation = 'en';
    this.token = API_TOKEN;
    this.base_url = API_BASE_PATH;
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

if (!window.customElements.get('weather-forecast-widget')) {
  window.customElements.define('weather-forecast-widget', WeatherForecast);
}
