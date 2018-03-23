import {Injectable} from '@angular/core';

@Injectable()
export class FeaturedJobService {

  description = `
    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
    ut aliquip ex ea commodo
  `;

  image1 = `http://www.carrefour.com/sites/default/files/styles/neutral/public/logocorporateimpression.jpg`;
  image2 = `https://cdn1.itcentralstation.com/vendors/logos/original/Accenture_logo.jpg`;
  image3 = `http://www.falabella.com/static/site/common/Falabella-Chile.jpg`;
  image4 = `http://www.dc.uba.ar/events/eci/2014/logo-mercadolibre.jpg`;

  featuredJob = [
    {id: 1, company: `Carrefour`, position: `Gerente de operaciones`, imageUrl: this.image1, description: this.description},
    {id: 1, company: `Accenture`, position: `Analista de Sistemas`, imageUrl: this.image2, description: this.description},
    {id: 1, company: `Falabella`, position: `Vendedor`, imageUrl: this.image3, description: this.description},
    {id: 1, company: `Mercado Libre`, position: `Desarrollador Javascript`, imageUrl: this.image4, description: this.description}
  ];

  constructor() {
  }

}
