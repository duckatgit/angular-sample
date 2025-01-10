import {
  GenderIdentity,
  GenderListData,
  IndigenousStatus,
  InsuranceFund,
  InsuranceLevel,
  PersonalPronouns,
  SidebarMenu,
} from '../models/common.model';

export class Constant {
  public static SIDEBAR_MENU: SidebarMenu[] = [
    {
      name: 'Dashboard',
      icon: 'dashboard.png',
      route: '/user/dashboard',
    },
    {
      name: 'Schedule',
      icon: 'calendar.png',
      route: '/user/schedule',
    },
    {
      name: 'Patients',
      icon: 'user.png',
      route: '/user/patients',
    },
    {
      name: 'Telehealth',
      icon: 'health.png',
      route: '/user/telehealth',
    },
    {
      name: 'Monitoring',
      icon: 'desktop.png',
      route: '/user/monitoring',
    },
    {
      name: 'Payments',
      icon: 'payment.png',
      route: '/user/payments',
    },
    {
      name: 'Expenses',
      icon: 'dollar.png',
      route: '/user/expenses',
    },
    {
      name: 'Communications',
      icon: 'chat.png',
      route: '/user/communication',
    },
    {
      name: 'Reports',
      icon: 'chart.png',
      route: '/user/reports',
    },
    {
      name: 'Settings',
      icon: 'settings.png',
      route: '/user/settings',
    },
    {
      name: 'Help',
      icon: 'help.png',
      route: '/user/help',
    },
  ];

  public static SETTINGS_MENU: SidebarMenu[] = [
    {
      name: 'Practice Details',
      icon: 'info.svg',
      route: '/user/settings/details',
    },
    {
      name: 'Practice Staff',
      icon: 'user.svg',
      route: '/user/settings/staff',
    },
    {
      name: 'Calendar',
      icon: 'user-calendar.svg',
      route: '/user/settings/calendar',
    },
    {
      name: 'Communications',
      icon: 'mail.svg',
      route: '/user/settings/communications',
    },
    {
      name: 'Pricing Catalog',
      icon: 'sell.svg',
      route: '/user/settings/pricing',
    },
    {
      name: 'Consent Forms',
      icon: 'description.svg',
      route: '/user/settings/forms',
    },
    {
      name: 'Medications',
      icon: 'medication.svg',
      route: '/user/settings/medications',
    },
  ];

  public static GENDER_LIST: GenderListData[] = [
    {
      name: 'Indeterminate',
      value: 'I',
    },
    {
      name: 'Female',
      value: 'F',
    },
    {
      name: 'Intersex',
      value: '4',
    },
    {
      name: 'Male',
      value: 'M',
    },
    {
      name: 'Not Stated/ Inadequately Described',
      value: '9',
    },
    {
      name: 'Not Specified',
      value: 'NSP',
    },
  ];

  public static INDIGENOUSSTATUS: IndigenousStatus[] = [
    {
      name: 'Aboriginal',
      value: '5',
    },
    {
      name: 'BOTH Aboriginal & TSI',
      value: '7',
    },
    {
      name: 'Patient refused to answer',
      value: '9',
    },
    {
      name: 'NOT Aboriginal or TSI',
      value: '2',
    },
    {
      name: 'Not Stated/inadequately described',
      value: 'NSID',
    },
    {
      name: 'Question unable to be asked',
      value: '8',
    },
    {
      name: 'Torres Strait Islander',
      value: '6',
    },
    {
      name: 'Did not meet client/could not ascretain',
      value: 'DMC',
    },
    {
      name: 'Not Specified',
      value: 'NSP',
    },
  ];

  public static GENDER_IDENTITY: GenderIdentity[] = [
    {
      name: 'Transgender Female',
      value: 'transgender-female',
    },
    {
      name: 'Transgender Male',
      value: 'transgender-male',
    },
    {
      name: 'Non-Binary',
      value: 'non-binary',
    },
    {
      name: 'Male',
      value: 'male',
    },
    {
      name: 'Female',
      value: 'female',
    },
    {
      name: 'Other',
      value: 'other',
    },
    {
      name: 'Does not wish to disclose',
      value: 'non-disclose',
    },
  ];

  public static PERSONALPRONOUNS: PersonalPronouns[] = [
    {
      name: 'he/him/his/his/himself',
      value: '0',
    },
    {
      name: 'she/her/her/hers/herself',
      value: '1',
    },
    {
      name: 'they/them/their/theirs/themselves',
      value: '2',
    },
    {
      name: 'ze/zir/zir/zirs/zirself',
      value: '3',
    },
    {
      name: 'xie/hir ("here")/hir/hirs/hirself',
      value: '4',
    },
    {
      name: 'co/co/cos/cos/coself',
      value: '5',
    },
    {
      name: 'en/en/ens/ens/enself',
      value: '6',
    },
    {
      name: 'en/en/ens/ens/enself',
      value: '6',
    },
    {
      name: 'ey/em/eir/eirs/emself',
      value: '7',
    },
    {
      name: 'yo/yo/yos/yos/yoself',
      value: '8',
    },
    {
      name: 've/vis/ver/ver/verself',
      value: '9',
    },
  ];
  public static INSURANCEFUND: InsuranceFund[] = [
    {
      fundName: 'ACA Health Benefits Fund',
      fundCode: 'ACA',
    },
    {
      fundName: 'ANZ Health Insurance',
      fundCode: 'ANZ',
    },
    {
      fundName: 'Australian Country Health',
      fundCode: 'ACH',
    },
    {
      fundName: 'Australian Union Health',
      fundCode: 'AUH',
    },
    {
      fundName: 'Australian Unity Health',
      fundCode: 'AUF',
    },
    {
      fundName: 'BUPA Australia Pty Limited',
      fundCode: 'BUP',
    },
    {
      fundName: 'CBHS Health Fund Limited',
      fundCode: 'CBH',
    },
    {
      fundName: 'Cessnock District Health Benefits Fund',
      fundCode: 'CDH',
    },
    {
      fundName: 'Comcare',
      fundCode: 'COMC',
    },
    {
      fundName: 'Compensable Parties',
      fundCode: 'COMP',
    },
    {
      fundName: 'CUA Health',
      fundCode: 'CPS',
    },
    {
      fundName: 'Department of Defence',
      fundCode: 'DOD',
    },
    {
      fundName: 'Dept of Veterans Affairs',
      fundCode: 'DVA',
    },
    {
      fundName: 'Defence Health',
      fundCode: 'AHB',
    },
    {
      fundName: 'Federation Health',
      fundCode: 'LHS',
    },
    {
      fundName:
        'Geelong Medical and Hospital Benefits Association [GMHBA] Limited',
      fundCode: 'GMH',
    },
    {
      fundName: 'Grand United Corporate Health Limited',
      fundCode: 'FAI',
    },
    {
      fundName: 'Grand United Health Fund Pty Ltd',
      fundCode: 'AUF',
    },
    {
      fundName: 'Health.com.au',
      fundCode: 'HEA',
    },
    {
      fundName: 'Health Care Insurance Ltd',
      fundCode: 'HCI',
    },
    {
      fundName: 'Health Insurance Fund of Australia',
      fundCode: 'HIF',
    },
    {
      fundName: 'Health Partners Limited',
      fundCode: 'SPS',
    },
    {
      fundName: 'Healthguard Health Benefits Fund Limited',
      fundCode: 'HHB',
    },
    {
      fundName: 'Hospital Benefits Association Limited',
      fundCode: 'BUP',
    },
    {
      fundName: 'HBF Health Limited',
      fundCode: 'HBF',
    },
    {
      fundName: 'Hospitals Contribution Fund of Australia Ltd',
      fundCode: 'HCF',
    },
    {
      fundName: 'Illawara Health Fund',
      fundCode: 'IHF',
    },
    {
      fundName: 'ING Mercantile Mutual',
      fundCode: 'ING',
    },
    {
      fundName: 'Latrobe Health Services Limited',
      fundCode: 'LHS',
    },
    {
      fundName: 'Lysaght Peoplecare',
      fundCode: 'LHM',
    },
    {
      fundName: 'Manchester Unity Australia Ltd',
      fundCode: 'HCF',
    },
    {
      fundName: 'MBF Alliances (NRMA Health, SGIC Health, SGIO Health)',
      fundCode: 'SGI',
    },
    {
      fundName: 'Medibank Private Limited',
      fundCode: 'MBP',
    },
    {
      fundName: 'Medical Benefits Fund of Australia Ltd',
      fundCode: 'BUP',
    },
    {
      fundName: 'Medicare - Public Patient',
      fundCode: 'HIC',
    },
    {
      fundName: 'Mildura District Hospital Fund',
      fundCode: 'MDH',
    },
    {
      fundName: 'Mutual Community Ltd',
      fundCode: 'BUP',
    },
    {
      fundName: 'National Mutual Health Insurance',
      fundCode: 'BUP',
    },
    {
      fundName: 'Nationwide Credit Control',
      fundCode: 'NWCC',
    },
    {
      fundName: 'Navy Health Ltd',
      fundCode: 'NHB',
    },
    {
      fundName: 'NIB Health Funds Limited',
      fundCode: 'NIB',
    },
    {
      fundName: 'OMF National Health Benefits, Pty. Ltd',
      fundCode: 'OMF',
    },
    {
      fundName: 'Overseas Health Fund',
      fundCode: 'OVSF',
    },
    {
      fundName: 'PAMAC',
      fundCode: 'PAM',
    },
    {
      fundName: 'Phoenix Health Fund Ltd',
      fundCode: 'PWA',
    },
    {
      fundName: "South Australian Police Employees' Health Fund Incorporated",
      fundCode: 'SPE',
    },
    {
      fundName: 'Queensland Country Health Limited',
      fundCode: 'MIM',
    },
    {
      fundName: 'Queensland Teachers Union Health',
      fundCode: 'QTU',
    },
    {
      fundName: 'Railway & Transport Health Fund Ltd',
      fundCode: 'RTE',
    },
    {
      fundName: 'Reserve Bank Health Society',
      fundCode: 'RBH',
    },
    {
      fundName: 'Self Funded/NIL Insured',
      fundCode: 'NIL',
    },
    {
      fundName: "St Luke's Medical & Hospital Benefits Association Limited",
      fundCode: 'SLM',
    },
    {
      fundName: "Teacher's Federation Health Limited",
      fundCode: 'NTF',
    },
    {
      fundName: 'Territory Insurance Office',
      fundCode: 'TIO',
    },
    {
      fundName: 'Transitional /Restorative Care Programs',
      fundCode: 'TCRCP',
    },
    {
      fundName: 'The Doctors Health Fund Ltd',
      fundCode: 'AMA',
    },
    {
      fundName: 'Transport Accident Commission',
      fundCode: 'TAC',
    },
    {
      fundName: 'Transport Health Pty Ltd',
      fundCode: 'TFS',
    },
    {
      fundName: 'United Ancient Order of Druids Friendly Society Limited',
      fundCode: 'GMH',
    },
    {
      fundName:
        'United Ancient Order of Druids Registered Friendly Society Grand Lodge of NSW',
      fundCode: 'AHM',
    },
    {
      fundName: 'Victorian Farmers Federation',
      fundCode: 'VFF',
    },
    {
      fundName: 'Victorian Workcover Authority',
      fundCode: 'VWA',
    },
    {
      fundName: 'New Australian Hospital Insurance Fund',
      fundCode: '996',
    },
    {
      fundName: 'Non Australian Hospital Insurance Fund',
      fundCode: '997',
    },
    {
      fundName: 'Patient is insured but will not/cannot specifiy the fund',
      fundCode: '998',
    },
    {
      fundName: 'Patient is uninsured/insurance status unknown',
      fundCode: '999',
    },
  ];
  public static INSURANCELEVEL: InsuranceLevel[] = [
    {
      levelName: 'Basic Hospital Cover',
      levelCode: 'BASIC',
      levelValue: 'BASIC',
    },
    {
      levelName: 'DVA Entitlement Other',
      levelCode: 'DEO',
      levelValue: 'DV',
    },
    {
      levelName: 'Extras Only',
      levelCode: 'EO',
      levelValue: 'EO',
    },
    {
      levelName: 'Insured - Level Unknown',
      levelCode: 'IUNKN',
      levelValue: 'IUNKN',
    },
    {
      levelName: 'Intermediate Hospital Cover',
      levelCode: 'INTER',
      levelValue: 'INTER',
    },
    {
      levelName: 'No DVA Entitlement',
      levelCode: 'NDE',
      levelValue: 'NDE',
    },
    {
      levelName: 'Not Applicable',
      levelCode: 'NA',
      levelValue: 'NA',
    },
    {
      levelName: 'Not Specified',
      levelCode: 'NSP',
      levelValue: 'NSP',
    },
    {
      levelName: 'Not Stated/Inadequately Described',
      levelCode: '9',
      levelValue: '9',
    },
    {
      levelName: 'Top Hospital Cover',
      levelCode: 'TOP',
      levelValue: 'TOP',
    },
    {
      levelName: 'Overseas Student',
      levelCode: 'OSS',
      levelValue: 'OVSS',
    },
    {
      levelName: 'Overseas Vistor',
      levelCode: 'OSV',
      levelValue: 'OVSV',
    },
    {
      levelName: 'DVA Gold Card',
      levelCode: 'DVAG',
      levelValue: 'DVG',
    },
    {
      levelName: 'DVA White Card',
      levelCode: 'DVAW',
      levelValue: 'DVW',
    },
    {
      levelName: 'DVA Orange Card',
      levelCode: 'RPBC',
      levelValue: 'DVO',
    },
    {
      levelName: 'Pensionner Concession Card',
      levelCode: 'PCC',
      levelValue: 'NA',
    },
    {
      levelName: 'Commonwealth Seniors Healthcare Card',
      levelCode: 'CSHC',
      levelValue: 'NA',
    },
    {
      levelName: 'Hospital Insurance Status Unknown',
      levelCode: 'HISU',
      levelValue: 'IUNKN',
    },
    {
      levelName: 'Gold Cover',
      levelCode: 'GOLD',
      levelValue: 'GOLD',
    },
    {
      levelName: 'Silver Cover',
      levelCode: 'SILV',
      levelValue: 'SILV',
    },
    {
      levelName: 'Silver Plus Cover',
      levelCode: 'SILVP',
      levelValue: 'SILVP',
    },
    {
      levelName: 'Bronze Cover',
      levelCode: 'BRNZ',
      levelValue: 'BRNZ',
    },
    {
      levelName: 'Bronze Plus Cover',
      levelCode: 'BRNZP',
      levelValue: 'BRNZP',
    },
    {
      levelName: 'Basic Plus Cover',
      levelCode: 'BASCP',
      levelValue: 'BASCP',
    },
  ];
}
