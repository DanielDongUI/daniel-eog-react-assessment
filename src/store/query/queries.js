import gql from 'graphql-tag';

export const getMultipleMeasurementsQuery = gql`
  query($input: [MeasurementQuery]) {
    getMultipleMeasurements(input: $input) {
      metric
      measurements {
        at
        value
      }
    }
  }
`;

export const getMetricsQuery = gql`
  {
    getMetrics
  }
`;

export const getNewMeasurement = gql`
  subscription measurement {
    newMeasurement {
      metric
      at
      value
      unit
    }
  }
`;

export const getWeather = gql`{
      getWeatherForLocation(latLong:{latitude: 29.749907 longitude: -95.3698}){
          locationName
          description
          temperatureinCelsius
      }
  }
`;
