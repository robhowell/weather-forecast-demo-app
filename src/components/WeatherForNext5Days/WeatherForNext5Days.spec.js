import { getWeatherDataDayArray } from './WeatherForNext5Days';
import simplifiedMockResponse from '../../test-data/simplifiedMockResponse';

describe('getWeatherDataDayArray', () => {
  it('should return the weather list sorted by day', () => {
    const actual = getWeatherDataDayArray(simplifiedMockResponse.list);
    const expected = [
      {
        date: '2017-08-05',
        weather: [
          {
            dt: 1501891200,
            dt_txt: '2017-08-05 00:00:00',
            main: { temp: 16.04 },
            weather: [{ main: 'Rain' }]
          },
          {
            dt: 1501902000,
            dt_txt: '2017-08-05 03:00:00',
            main: { temp: 17.72 },
            weather: [{ main: 'Clear' }]
          }
        ]
      },
      {
        date: '2017-08-06',
        weather: [
          {
            dt: 1501977600,
            dt_txt: '2017-08-06 00:00:00',
            main: { temp: 22.699 },
            weather: [{ main: 'Rain' }]
          },
          {
            dt: 1501988400,
            dt_txt: '2017-08-06 03:00:00',
            main: { temp: 21.059 },
            weather: [{ main: 'Clear' }]
          }
        ]
      }
    ];
    expect(actual).toEqual(expected);
  });
});
