export class OfferFilter {
  id: number;
  offerId: number;
  ageRange: number;
  gender: number;
  yearsOfExperience: number;
  educationLevel: number;
  rotationPeriods: number;
  distanceRadius: number;
  managementSkillset: number[] = [];
  technicalSkillset: number[] = [];
  languageSkillset: Map<number, number> = new Map();
}
