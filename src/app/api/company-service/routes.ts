const basePath = '/api/companies';

export const API = {
  get: {
    privacies: () => `${basePath}/privacies/`,
    company: (companyId) => `${basePath}/${companyId}`,
    companyInfo: (companyId) => `${basePath}/${companyId}/info`,
    companySelectors: (companyId) => `${basePath}/${companyId}/selectors`,
    companyEmails: (companyId) => `${basePath}/${companyId}/emails`,
    companyPhones: (companyId) => `${basePath}/${companyId}/phones`,
    companyAddresses: (companyId) => `${basePath}/${companyId}/addresses`,
    companyPerks: (companyId) => `${basePath}/${companyId}/perks`,
    companyPrivacies: (companyId) => `${basePath}/${companyId}/privacies`,
    companyFastContactEmail: (companyId) => `${basePath}/${companyId}/fastContactEmails`
  },
  post: {
    companySelectors: (companyId) => `${basePath}/${companyId}/selectors`,
    companySelectorsToAdd: (companyId) => `${basePath}/${companyId}/selectorsToAdd`,
    companyEmails: (companyId) => `${basePath}/${companyId}/emails`,
    companyPhones: (companyId) => `${basePath}/${companyId}/phones`,
    companyAddresses: (companyId) => `${basePath}/${companyId}/addresses`,
    companyLogo: (companyId) => `${basePath}/${companyId}/logo`,
    companyPerks: (companyId, perkId) => `${basePath}/${companyId}/perks/${perkId}`,
    companyPrivacies: (companyId, privacyId) => `${basePath}/${companyId}/privacies/${privacyId}`,
    companyFastContactEmail: (companyId) => `${basePath}/${companyId}/fastContactEmails`
  },
  put: {
    company: (companyId) => `${basePath}/${companyId}`,
    companyEmails: (companyId, emailId) => `${basePath}/${companyId}/emails/${emailId}`,
    companyPhones: (companyId, phoneId) => `${basePath}/${companyId}/phones/${phoneId}`,
    companyAddresses: (companyId, addressId) => `${basePath}/${companyId}/addresses/${addressId}`,
    companyWebsite: (companyId) => `${basePath}/${companyId}/website`,
    companyFastContactEmail: (companyId, fastContactEmailId) => `${basePath}/${companyId}/fastContactEmails/${fastContactEmailId}`
  },
  delete: {
    companySelectors: (companyId, selectorId) => `${basePath}/${companyId}/selectors/${selectorId}`,
    companySelectorsToAdd: (companyId, selectorToAddId) => `${basePath}/${companyId}/selectorsToAdd/${selectorToAddId}`,
    companyEmails: (companyId, emailId) => `${basePath}/${companyId}/emails/${emailId}`,
    companyPhones: (companyId, phoneId) => `${basePath}/${companyId}/phones/${phoneId}`,
    companyAddresses: (companyId, addressId) => `${basePath}/${companyId}/addresses/${addressId}`,
    companyLogo: (companyId) => `${basePath}/${companyId}/logo`,
    companyWebsite: (companyId) => `${basePath}/${companyId}/website`,
    companyPerks: (companyId, perkId) => `${basePath}/${companyId}/perks/${perkId}`,
    companyPrivacies: (companyId, privacyId) => `${basePath}/${companyId}/privacies/${privacyId}`,
    companyFastContactEmail: (companyId, fastContactEmailId) => `${basePath}/${companyId}/fastContactEmails/${fastContactEmailId}`
  }
};
