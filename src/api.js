const BASE_PATH_WEATHER = 'https://tourism.opendatahub.bz.it/api/Weather';

export async function district_details_api_call(id) {
  this.is_loading = true;
  let language =
    this.language_translation === 'en' || this.language_translation === 'it' || this.language_translation === 'de'
      ? this.language_translation
      : 'en';
  const path = `${BASE_PATH_WEATHER}/District?language=${language}&locfilter=${id}`;
  let request = await fetch(path, {
    method: 'GET',
    headers: new Headers({
      Accept: 'application/json',
      Authorization: `Bearer ${this.token}`
    })
  });

  const response = await request.json();
  this.district_details = response;
}
