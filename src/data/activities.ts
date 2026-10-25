export interface Activity {
  id: number;
  title: string;
  description: string;
  imageAlt: string;
}

export const activitiesData: Activity[] = [
  { 
    id: 1, 
    title: 'Soccer', 
    description: 'Our soccer team competes in local and regional tournaments.',
    imageAlt: 'Soccer Activity'
  },
  { 
    id: 2, 
    title: 'Netball', 
    description: 'Developing teamwork and physical fitness through netball.',
    imageAlt: 'Netball Activity'
  },
  { 
    id: 3, 
    title: 'Choir', 
    description: 'Our award-winning choir performs at various events.',
    imageAlt: 'Choir Activity'
  },
  { 
    id: 4, 
    title: 'Debate Club', 
    description: 'Enhancing public speaking and critical thinking skills.',
    imageAlt: 'Debate Club Activity'
  },
  { 
    id: 5, 
    title: 'Drama Club', 
    description: 'Creative expression through theater and performance.',
    imageAlt: 'Drama Club Activity'
  },
  { 
    id: 6, 
    title: 'Art Club', 
    description: 'Exploring creativity through various art mediums.',
    imageAlt: 'Art Club Activity'
  },
];