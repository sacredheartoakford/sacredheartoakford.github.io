export interface Event {
  id: number;
  title: string;
  date: string;
  description: string;
}

export const eventsData: Event[] = [
  { 
    id: 1, 
    title: 'Inter-house Athletics', 
    date: 'March 15, 2024', 
    description: 'Annual inter-house athletics competition for all grades.' 
  },
  { 
    id: 2, 
    title: 'Parent Evening', 
    date: 'March 22, 2024', 
    description: 'Term planning and parent-teacher meeting.' 
  },
  { 
    id: 3, 
    title: 'Matric Dance', 
    date: 'April 5, 2024', 
    description: 'Annual matric dance for Grade 12 students.' 
  },
  { 
    id: 4, 
    title: 'Science Fair', 
    date: 'May 10, 2024', 
    description: 'Showcasing student projects and innovations.' 
  },
  { 
    id: 5, 
    title: 'Annual Concert', 
    date: 'June 28, 2024', 
    description: 'Talented students performing music and drama.' 
  },
];