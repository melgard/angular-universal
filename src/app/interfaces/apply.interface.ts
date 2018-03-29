export interface IApply {
  id: number,
  date: Date,
  title: string,
  company: string,
  companyLogo: string,
  totalPhases: string[],
  phaseLastInstance: string;
  updated?: Date;
  historial: any[];
}
