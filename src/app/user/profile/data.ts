export interface IAUState {
  code: string;
  name: string;
}

export function AUStateFilter(value: string): IAUState[] {
  return AUStates.filter((state) => {
    return (
      state.code.length === 2 ||
      (state.code.length === 3 && state.code.toLowerCase() === value.toLowerCase()) ||
      state.name.toLowerCase().indexOf(value.toLowerCase()) === 0
    );
  });
}

export enum PhoneType {
  Mobile,
  Home,
  Work,
}

const AUStates: IAUState[] = [
  { code: 'ACT', name: 'Australian Capital Territory' },
  { code: 'NSW', name: 'New South Wales' },
  { code: 'NT', name: 'Northern Territory' },
  { code: 'TAS', name: 'Tasmania' },
  { code: 'QLD', name: 'Queensland' },
  { code: 'VIC', name: 'Victoria' },
  { code: 'WA', name: 'Western Australia' },
];
