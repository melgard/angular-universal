export class Constants {
  AGE_RANGES = [
    {description: '18 a 25', min: 18, max: 25, id: 1},
    {description: '26 a 40', min: 26, max: 40, id: 2},
    {description: '41 o más', min: 41, max: 80, id: 3},
    {description: 'indistinto', min: 18, max: 80, id: 0},
  ];
  GENDER = [
    {description: 'Masculino', id: 1},
    {description: 'Femenino', id: 2},
    {description: 'Indistinto', id: 0}
  ];

  MAX_DISTANCE_RADIUS = [
    {description: 'Hasta 5 km', id: 1},
    {description: 'Hasta 10 km', id: 2},
    {description: 'Hasta 20 km', id: 3},
    {description: 'Hasta 50 km', id: 4},
    {description: 'Hasta 100 km', id: 5},
    {description: 'Indistinto', id: 0}
  ];

  EXP_IN_YEARS = [
    {description: 'de 1 a 3 años', id: 1},
    {description: 'de 4 a 6 años', id: 2},
    {description: 'de 7 a 10 años', id: 3},
    {description: 'Más de 10 años', id: 4},
    {description: 'Indistinto', id: 0},
  ];

  EDUCATION_LEVELS = [
    {description: 'Ninguno', id: 1},
    {description: 'Primario', id: 2},
    {description: 'Secundario', id: 3},
    {description: 'Terciario', id: 4},
    {description: 'Universitario', id: 0},
  ];

  ROTATION_PERIOD = [
    {description: 'Mayor a 1 año', id: 1},
    {description: 'Mayor a 2 años', id: 2},
    {description: 'Mayor a 3 años', id: 3},
    {description: 'Mayor a 4 años', id: 4},
    {description: 'Mayor a 5 años', id: 5},
    {description: 'Indistinto', id: 0},
  ];
}
