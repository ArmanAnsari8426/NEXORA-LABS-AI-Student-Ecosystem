export interface Project {
  id: string;
  title: string;
  category: 'AI/ML' | 'Python' | 'MERN Stack' | 'React' | 'Cyber Security' | 'Java' | 'Android' | 'Networking' | 'Data Science';
  description: string;
  technology: string[];
  difficultyLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  features: string[];
  price: number;
  rating: number;
  salesCount: number;
  thumbnail: string;
  synopsisAvailable: boolean;
  pptAvailable: boolean;
  demoUrl?: string;
  longDescription: string;
  architecture: string;
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  lessonsCount: number;
  level: string;
  price: number;
  rating: number;
  thumbnail: string;
  features: string[];
  description: string;
  tags: string[];
}

export interface DocumentItem {
  id: string;
  title: string;
  type: 'Synopsis' | 'PPT' | 'PTD Report' | 'Research Document' | 'Final Report';
  category: string;
  pages: number;
  fileSize: string;
  price: number;
  downloads: number;
  description: string;
}

export interface TrainingProgram {
  id: string;
  title: string;
  duration: string;
  startDate: string;
  mode: 'Live Online' | 'Hybrid';
  technologies: string[];
  price: number;
  originalPrice: number;
  features: string[];
  seatsLeft: number;
  description: string;
  badge: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  college: string;
  content: string;
  avatar: string;
  rating: number;
}

export interface FAQ {
  question: string;
  answer: string;
  category: string;
}

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'Autonomous AI Med-Diagnose & Prescription Assistant',
    category: 'AI/ML',
    description: 'Next-gen LLM-driven medical symptom analyzer with computer vision X-ray anomaly detection and prescription generation.',
    technology: ['Python', 'TensorFlow', 'FastAPI', 'React', 'Docker'],
    difficultyLevel: 'Expert',
    features: ['Real-time symptom triage', 'DICOM & X-ray Image Segmentation', 'Automated PDF Report Generation', 'HIPAA compliant mock pipeline'],
    price: 2499,
    rating: 4.9,
    salesCount: 142,
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    synopsisAvailable: true,
    pptAvailable: true,
    demoUrl: 'https://nexoralabs.com/demo/ai-med',
    longDescription: 'This project is meticulously crafted for final year B.Tech, MCA, and BCA students looking to present a cutting-edge Artificial Intelligence healthcare system. It employs deep convolutional neural networks for diagnostic vision analysis and integrates with a secure FastAPI backend.',
    architecture: 'Microservices architecture with React frontend communicating via WebSockets to Python workers handling ML inference.'
  },
  {
    id: 'proj-2',
    title: 'Enterprise MERN E-Commerce Platform with AI Recommendations',
    category: 'MERN Stack',
    description: 'Full-featured marketplace with Redux Toolkit, Stripe/Razorpay payment gateways, JWT Auth, Admin Dashboard, and collaborative filtering product recommendations.',
    technology: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS', 'Redux'],
    difficultyLevel: 'Advanced',
    features: ['Multi-vendor inventory management', 'Real-time sales chart analytics', 'AI-based related item recommendations', 'Automated invoice generation'],
    price: 1899,
    rating: 4.8,
    salesCount: 210,
    thumbnail: 'https://images.unsplash.com/photo-1556742049-0a67d55febc2?auto=format&fit=crop&w=800&q=80',
    synopsisAvailable: true,
    pptAvailable: true,
    demoUrl: 'https://nexoralabs.com/demo/mern-ecommerce',
    longDescription: 'A production-grade e-commerce application ideal for college submission. Complete with clean MVC backend structure, MongoDB aggregation pipelines, and fully responsive Tailwind UI.',
    architecture: 'Standard MERN Monolith with decoupled Express controllers and Mongoose schemas.'
  },
  {
    id: 'proj-3',
    title: 'Blockchain-based Decentralized College Voting System',
    category: 'Cyber Security',
    description: 'Tamper-proof student union election portal utilizing Ethereum smart contracts, Web3.js, and zero-knowledge identity proofing.',
    technology: ['Solidity', 'React', 'Web3.js', 'Node.js', 'Ganache'],
    difficultyLevel: 'Expert',
    features: ['Anonymous voter registration', 'Smart contract immutable ledger', 'Real-time tally dashboard', 'Cryptographic audit verification'],
    price: 2999,
    rating: 5.0,
    salesCount: 88,
    thumbnail: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80',
    synopsisAvailable: true,
    pptAvailable: true,
    demoUrl: 'https://nexoralabs.com/demo/crypto-vote',
    longDescription: 'Perfect for cybersecurity and computer science students seeking a high-scoring final semester submission. Solves real-world election transparency issues with verifiable blockchain logs.',
    architecture: 'Decentralized DApp architecture connecting React frontend to Ethereum testnet via MetaMask providers.'
  },
  {
    id: 'proj-4',
    title: 'Smart Campus Attendance & Surveillance Tracker',
    category: 'Python',
    description: 'OpenCV facial recognition system that automates daily class attendance and flags unauthorized perimeter breaches.',
    technology: ['Python', 'OpenCV', 'Django', 'SQLite', 'Bootstrap'],
    difficultyLevel: 'Intermediate',
    features: ['Live webcam face detection', 'Excel export of attendance logs', 'Email trigger for absentees', 'Admin overrides and reporting'],
    price: 1499,
    rating: 4.7,
    salesCount: 315,
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    synopsisAvailable: true,
    pptAvailable: false,
    demoUrl: 'https://nexoralabs.com/demo/smart-campus',
    longDescription: 'An exceptionally popular project among Diploma, Polytechnic, and BCA students. Extremely easy to set up and demonstrate live before external examiners.',
    architecture: 'Django MTV architecture integrated with OpenCV background video frame capture threads.'
  },
  {
    id: 'proj-5',
    title: 'Real-time Encrypted Chat & Video Conferencing App',
    category: 'React',
    description: 'WebRTC and Socket.io powered instant messaging suite with end-to-end encryption, screen sharing, and virtual whiteboard.',
    technology: ['React', 'Socket.io', 'WebRTC', 'Node.js', 'Tailwind CSS'],
    difficultyLevel: 'Advanced',
    features: ['Peer-to-peer HD video calling', 'AES-256 message encryption', 'File sharing up to 100MB', 'Interactive collaborative canvas'],
    price: 1999,
    rating: 4.9,
    salesCount: 175,
    thumbnail: 'https://images.unsplash.com/photo-1616469829941-c7200edec809?auto=format&fit=crop&w=800&q=80',
    synopsisAvailable: true,
    pptAvailable: true,
    demoUrl: 'https://nexoralabs.com/demo/secure-chat',
    longDescription: 'Demonstrates stellar understanding of network protocols, WebSockets, and real-time state management. Comes with a pristine dark mode interface.',
    architecture: 'Mesh WebRTC signaling server built on Express with React frontend managing audio/video media streams.'
  },
  {
    id: 'proj-6',
    title: 'Predictive Stock Market Analytics & Portfolio Bot',
    category: 'Data Science',
    description: 'LSTM neural network model that forecasts stock price fluctuations and recommends automated rebalancing.',
    technology: ['Python', 'Pandas', 'Scikit-Learn', 'Keras', 'Streamlit'],
    difficultyLevel: 'Advanced',
    features: ['Historical ticker ingestion', 'Sentiment analysis of financial news', 'Interactive backtesting graphs', 'Risk-reward metrics calculator'],
    price: 2199,
    rating: 4.6,
    salesCount: 130,
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    synopsisAvailable: true,
    pptAvailable: true,
    demoUrl: 'https://nexoralabs.com/demo/stock-ai',
    longDescription: 'An advanced data science project tailored for B.Tech and MCA candidates. Combines statistical modeling with an intuitive Streamlit web interface.',
    architecture: 'Python Streamlit web application running predictive inference against pre-trained Keras h5 models.'
  },
  {
    id: 'proj-7',
    title: 'Cloud-based Hostel Management & Grievance Portal',
    category: 'Java',
    description: 'Robust Spring Boot application with Hibernate ORM handling room allocations, mess fees, and maintenance ticket tracking.',
    technology: ['Java', 'Spring Boot', 'MySQL', 'Thymeleaf', 'Bootstrap'],
    difficultyLevel: 'Intermediate',
    features: ['Automated room allotment algorithm', 'QR code mess pass scanning', 'Dynamic fee receipts', 'Staff task delegation panel'],
    price: 1599,
    rating: 4.8,
    salesCount: 240,
    thumbnail: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
    synopsisAvailable: true,
    pptAvailable: true,
    demoUrl: 'https://nexoralabs.com/demo/hostel-erp',
    longDescription: 'Classic enterprise architecture demonstrating solid Object-Oriented Principles. Highly favored by university faculty evaluating Java enterprise design patterns.',
    architecture: 'Monolithic Spring Boot MVC with Layered Service, Repository, and Controller tiers.'
  },
  {
    id: 'proj-8',
    title: 'Smart City Traffic Flow Optimizer & Emergency Override',
    category: 'Networking',
    description: 'IoT simulated network using Cisco Packet Tracer and Python controllers to clear traffic lights for incoming ambulances.',
    technology: ['Python', 'IoT Simulation', 'Cisco Packet Tracer', 'Flask'],
    difficultyLevel: 'Advanced',
    features: ['Simulation of 4-way smart intersections', 'GPS emergency vehicle prioritization', 'Latency & packet drop analysis', 'Web monitoring dashboard'],
    price: 1799,
    rating: 4.7,
    salesCount: 95,
    thumbnail: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80',
    synopsisAvailable: true,
    pptAvailable: true,
    demoUrl: 'https://nexoralabs.com/demo/smart-traffic',
    longDescription: 'Excellent for Computer Networking and IoT specialization students. Includes pre-configured simulation files and comprehensive network topology documentation.',
    architecture: 'Python Flask REST API acting as an IoT controller hub communicating with simulated sensor nodes.'
  },
  {
    id: 'proj-9',
    title: 'AI Fitness Trainer & Posture Correction App',
    category: 'Android',
    description: 'Kotlin mobile app utilizing MediaPipe pose detection to count workout reps and give real-time vocal feedback on form.',
    technology: ['Kotlin', 'Android Studio', 'TensorFlow Lite', 'Firebase'],
    difficultyLevel: 'Advanced',
    features: ['On-device AI pose tracking', 'Custom workout planner', 'Gamified leaderboard', 'Cloud sync across devices'],
    price: 2299,
    rating: 4.9,
    salesCount: 160,
    thumbnail: 'https://images.unsplash.com/photo-1461896836934-ded6031ea2f0?auto=format&fit=crop&w=800&q=80',
    synopsisAvailable: true,
    pptAvailable: true,
    demoUrl: 'https://nexoralabs.com/demo/fit-ai',
    longDescription: 'State-of-the-art Android project that wows examiners. Combines native mobile development with lightweight on-device machine learning models.',
    architecture: 'MVVM Android Architecture with Repository pattern and Coroutines for asynchronous camera frame processing.'
  }
];

export const MOCK_COURSES: Course[] = [
  {
    id: 'course-1',
    title: 'AI Masterclass: Prompt Engineering & LLM Application Building',
    instructor: 'Dr. Siddharth Varma (Ex-OpenAI Researcher)',
    duration: '42 Hours',
    lessonsCount: 68,
    level: 'All Levels',
    price: 1999,
    rating: 4.9,
    thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80',
    features: ['Lifetime access', 'Certificate of Completion', '5 Mini AI Projects', 'Direct Slack Mentoring'],
    description: 'Master LangChain, Pinecone vector databases, OpenAI APIs, and build intelligent chatbots and autonomous agents from scratch.',
    tags: ['AI/ML', 'Python', 'ChatGPT', 'SaaS']
  },
  {
    id: 'course-2',
    title: 'MERN Stack Job-Ready Mastery with Production Deployment',
    instructor: 'Aman Sharma (Senior Tech Lead)',
    duration: '55 Hours',
    lessonsCount: 92,
    level: 'Intermediate',
    price: 1499,
    rating: 4.8,
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    features: ['100% Practical coding', 'Build 3 Enterprise apps', 'AWS & Vercel deployment', 'Resume review session'],
    description: 'The ultimate guide to building high-performance web applications using React 19, Node.js, Express, MongoDB, and Tailwind CSS.',
    tags: ['React', 'Node.js', 'MongoDB', 'WebDev']
  },
  {
    id: 'course-3',
    title: 'Complete Cyber Security & Ethical Hacking Bootcamp',
    instructor: 'Rohan Mehta (Certified Ethical Hacker)',
    duration: '38 Hours',
    lessonsCount: 54,
    level: 'Advanced',
    price: 2499,
    rating: 4.9,
    thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    features: ['Pre-configured Kali Linux VM', 'Live penetration testing labs', 'OWASP Top 10 breakdown', 'Bug Bounty roadmap'],
    description: 'Learn wireless network attacks, web application vulnerabilities, buffer overflows, and defensive security measures.',
    tags: ['Security', 'Hacking', 'Linux', 'Network']
  },
  {
    id: 'course-4',
    title: 'Python Data Science & Machine Learning A-Z',
    instructor: 'Priya Swaminathan (Lead Data Scientist)',
    duration: '48 Hours',
    lessonsCount: 75,
    level: 'Beginner to Pro',
    price: 1299,
    rating: 4.7,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    features: ['Jupyter Notebooks included', 'Real-world Kaggle datasets', 'Deep Learning with PyTorch', 'Certificate verification'],
    description: 'Comprehensive curriculum covering data preprocessing, regression, clustering, decision trees, and neural networks.',
    tags: ['Data Science', 'Python', 'ML', 'Analytics']
  }
];

export const MOCK_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-1',
    title: 'AI Medical Assistant Full Synopsis & SRS Document',
    type: 'Synopsis',
    category: 'AI/ML',
    pages: 24,
    fileSize: '4.2 MB',
    price: 299,
    downloads: 530,
    description: 'Standard IEEE format synopsis including Introduction, Feasibility Study, DFD level 0,1,2 diagrams, and ER Models.'
  },
  {
    id: 'doc-2',
    title: 'E-Commerce Platform Viva & PTD Presentation Slides',
    type: 'PPT',
    category: 'MERN Stack',
    pages: 32,
    fileSize: '12.8 MB',
    price: 199,
    downloads: 812,
    description: 'Stunning animated PowerPoint presentation covering problem statement, system architecture, tech stack justification, and future scope.'
  },
  {
    id: 'doc-3',
    title: 'Blockchain Voting System Final Project Report',
    type: 'Final Report',
    category: 'Cyber Security',
    pages: 85,
    fileSize: '8.5 MB',
    price: 499,
    downloads: 340,
    description: 'Complete university-ready final report formatted with correct margins, bibliography, code snippets, and testing screenshots.'
  },
  {
    id: 'doc-4',
    title: 'Smart Attendance System Research Paper Draft',
    type: 'Research Document',
    category: 'Python',
    pages: 14,
    fileSize: '2.1 MB',
    price: 399,
    downloads: 190,
    description: 'Drafted research paper suitable for submission to international conferences and college journals.'
  },
  {
    id: 'doc-5',
    title: 'Hostel ERP System Preliminary Project Report (PTD)',
    type: 'PTD Report',
    category: 'Java',
    pages: 45,
    fileSize: '5.6 MB',
    price: 349,
    downloads: 420,
    description: 'Thorough preliminary document with Gantt charts, cost estimation, software requirements specification, and module overview.'
  }
];

export const MOCK_TRAINING: TrainingProgram[] = [
  {
    id: 'train-1',
    title: '4-Week AI & Deep Learning Summer Internship Training',
    duration: '4 Weeks (40 Hrs Live)',
    startDate: 'May 15, 2026',
    mode: 'Live Online',
    technologies: ['Python', 'TensorFlow', 'OpenAI API', 'FastAPI'],
    price: 2999,
    originalPrice: 5999,
    features: ['Industrial Training Certificate', 'Letter of Recommendation (LOR)', 'Build 2 Major Projects', 'Weekly mock interviews', 'Live doubt clearing'],
    seatsLeft: 14,
    description: 'Intensive summer training designed specifically for B.Tech and MCA students needing mandatory college internship credits with real-world AI exposure.',
    badge: 'Most Popular'
  },
  {
    id: 'train-2',
    title: '6-Week Full Stack React & Node.js Industrial Training',
    duration: '6 Weeks (60 Hrs Live)',
    startDate: 'June 01, 2026',
    mode: 'Live Online',
    technologies: ['React 19', 'Node.js', 'TypeScript', 'MongoDB', 'AWS'],
    price: 3499,
    originalPrice: 6999,
    features: ['Guaranteed Internship Certificate', '1-on-1 Code Reviews', 'Deploy Live SaaS Project', 'Placement Assistance', 'Guest lectures from MAANG devs'],
    seatsLeft: 8,
    description: 'Master the entire web development lifecycle. From UI/UX wireframing to secure backend architecture and serverless deployment.',
    badge: 'Elite Batch'
  },
  {
    id: 'train-3',
    title: '4-Week Cyber Security & Cloud Architecture Training',
    duration: '4 Weeks (35 Hrs Live)',
    startDate: 'May 20, 2026',
    mode: 'Hybrid',
    technologies: ['Linux', 'Wireshark', 'AWS Security', 'Python Automation'],
    price: 2799,
    originalPrice: 4999,
    features: ['Verifiable Training Certificate', 'Hands-on CTF Challenges', 'Network audit project', 'Access to premium cyber community'],
    seatsLeft: 19,
    description: 'Equip yourself with highly demanded cybersecurity skills. Learn defensive cloud setups and ethical vulnerability assessment.',
    badge: 'Fast Track'
  }
];

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Anjali Sharma',
    role: 'Final Year B.Tech Student',
    college: 'Delhi Technological University (DTU)',
    content: 'NEXORA LABS saved my final semester! The AI Medical Assistant project was flawless. The code was well-structured, and the mentoring session helped me answer every single question during my external viva. Got an A+!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    rating: 5
  },
  {
    id: 'test-2',
    name: 'Rahul Verma',
    role: 'MCA Graduate',
    college: 'Christ University',
    content: 'Requested a custom blockchain voting project. The workflow was incredibly transparent. Admin sent prompt email updates, and I unlocked the files instantly after uploading the payment screenshot. Best student service ever.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5
  },
  {
    id: 'test-3',
    name: 'Vikramjit Singh',
    role: 'BCA Student',
    college: 'Chandigarh University',
    content: 'The 4-week summer training program gave me exactly the industrial certificate I needed for college credits. The instructor was top-tier and the live support is genuinely active 24/7.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    rating: 5
  },
  {
    id: 'test-4',
    name: 'Sneha Patel',
    role: 'Diploma Student',
    college: 'Government Polytechnic',
    content: 'Purchased the synopsis and PPT for my smart campus attendance project. Formatted beautifully according to standard university guidelines. Absolutely worth every rupee.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5
  }
];

export const MOCK_FAQS: FAQ[] = [
  {
    category: 'Projects & Custom Requests',
    question: 'How does the Custom Project Request system work?',
    answer: 'Simply fill out the project request form with your required technology, deadline, and college requirements. Our system logs this to our database and notifies our expert developers. We will review your budget and requirements, approve the request, and provide a secure payment link. Once verified, we deliver the complete source code, reports, and generate your certificate.'
  },
  {
    category: 'Projects & Custom Requests',
    question: 'Can I get explanation or mentoring for the project I purchase?',
    answer: 'Yes! Every ready-made and custom project comes with setup instructions. Additionally, you can book a 1-on-1 project mentoring session with our developers to understand the code architecture so you can confidently present during your college viva.'
  },
  {
    category: 'Payments & Verification',
    question: 'How do I unlock my downloads after QR Code payment?',
    answer: 'After scanning our official QR code and completing the payment, upload the screenshot or transaction ID in the payment modal. Our automated/admin verification system verifies the payment within minutes and instantly unlocks the download links in your Student Dashboard.'
  },
  {
    category: 'Training & Certificates',
    question: 'Are the summer training certificates valid for college submission?',
    answer: 'Absolutely. All training certificates and project completion certificates issued by NEXORA LABS come with a unique, verifiable QR code and certificate ID that college HODs and examiners can verify online on our platform.'
  },
  {
    category: 'Files & Documentation',
    question: 'What is included in the Document Marketplace?',
    answer: 'You can download ready-to-submit Synopsis documents, PowerPoint presentations (PPT), Preliminary Project Reports (PTD), and comprehensive Final Reports formatted in standard IEEE / University guidelines.'
  }
];
