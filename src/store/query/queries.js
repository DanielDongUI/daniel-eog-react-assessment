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
