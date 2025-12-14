export interface FeesData {
  tuition: {
    term1: string;
    term2: string;
    term3: string;
    term4: string;
    annual: string;
  };
  boarding: {
    term1: string;
    term2: string;
    term3: string;
    term4: string;
    annual: string;
  };
  total: {
    term1: string;
    term2: string;
    term3: string;
    term4: string;
    annual: string;
  };
}

export const feesData: FeesData = {
  tuition: {
    term1: 'R 12,500',
    term2: 'R 12,500',
    term3: 'R 12,500',
    term4: 'R 12,500',
    annual: 'R 50,000'
  },
  boarding: {
    term1: 'R 15,000',
    term2: 'R 15,000',
    term3: 'R 15,000',
    term4: 'R 15,000',
    annual: 'R 60,000'
  },
  total: {
    term1: 'R 27,500',
    term2: 'R 27,500',
    term3: 'R 27,500',
    term4: 'R 27,500',
    annual: 'R 110,000'
  }
};