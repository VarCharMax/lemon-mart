export interface IAUState {
  code: string;
  name: string;
}

export function AUStateFilter(value: string): IAUState[] {
  return AUStates.filter((state) => {
    return (
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
  { code: 'VIC', name: 'Victoria' },
  { code: 'NSW', name: 'New South Wales' },
];
