import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    title: true,
    name: 'Actions',
  },
  {
    name: 'Home',
    url: '/home',
    iconComponent: { name: 'cil-home' },
  },
  {
    name: 'Batch Card',
    url: '/batchcard',
    iconComponent: { name: 'cil-spreadsheet' },
  },
  {
    name: 'Work Instructions',
    url: '/work_instruction',
    iconComponent: { name: 'cil-notes' },
  },
  {
    name: 'Raise NC / CAPA',
    url: '/batchcard',
    iconComponent: { name: 'cil-flag-alt' },
  },
  {
    name: 'Report Breakdown',
    url: '/batchcard',
    iconComponent: { name: 'cil-industry-slash' },
  },
  {
    name: 'Report an Event',
    url: '/batchcard',
    iconComponent: { name: 'cil-playlist-add' },
  },
];
