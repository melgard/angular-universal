import {Model} from './model';

export class ContactInfo extends Model {
  employeesCount: string;
  website: string;
  phone: string;
  email: string;

  constructor(config?) {
    super(config);
  }
}

export class Review extends Model {
  creatorName: string;
  creatorImageUrl: string;
  review: string;
  value: number;

  constructor(config?) {
    super(config);
  }
}

export class AddressInfo extends Model {
  primary: boolean;
  fullAddress: string;
  latitude: number;
  longitude: number;

  constructor(config?) {
    super(config);
  }
}

export class CompanyInfo extends Model {

  public id: number;
  public legalName: string;
  public tradeName: string;
  public description: string;
  public contactInfo: ContactInfo;
  public reviews: Review[];
  public addresses: AddressInfo[];

  constructor(config?) {
    super(config);
  }

  getPrimaryAddressLatitude() {
    const primary = this.addresses.find(a => a.primary);
    return primary ? primary.latitude : null;
  }

  getPrimaryAddressLongitude() {
    const primary = this.addresses.find(a => a.primary);
    return primary ? primary.longitude : null;
  }
}
