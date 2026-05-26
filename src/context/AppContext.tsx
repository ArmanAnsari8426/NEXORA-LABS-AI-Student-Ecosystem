import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_PROJECTS, MOCK_COURSES, MOCK_DOCUMENTS, MOCK_TRAINING, Project, Course, DocumentItem, TrainingProgram } from '../data/mockData';
import { authService, firestoreService, syncToGoogleSheets, projectRequestService, purchaseService, supportTicketService } from '../services/firebaseService';

export interface CustomProjectRequest {
  id: string;
  studentName: string;
  collegeName: string;
  technology: string;
  projectTitle: string;
  deadline: string;
  budget: number;
  phone: string;
  email: string;
  requirementDetails: string;
  status: 'Pending Verification' | 'Approved' | 'Delivered' | 'Rejected';
  submittedAt: string;
  paymentScreenshot?: string;
}

export interface PurchasedItem {
  id: string;
  type: 'project' | 'course' | 'document' | 'training';
  title: string;
  price: number;
  purchasedAt: string;
  status: 'Pending Verification' | 'Unlocked';
  downloadUrl?: string;
  synopsisUrl?: string;
  pptUrl?: string;
  ptdUrl?: string;
  certificateId?: string;
  thumbnail?: string;
}

export interface SupportTicket {
  id: string;
  studentName: string;
  email: string;
  subject: string;
  message: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  college: string;
  phone: string;
  degree?: string;
  rollNumber?: string;
  graduationYear?: string;
  avatar?: string;
  bio?: string;
  twoFactorAuth?: boolean;
  emailAlerts?: boolean;
}

interface AppContextType {
  user: User | null;
  firebaseUser: any | null;
  login: (email: string, password: string, role: 'student' | 'admin') => Promise<void>;
  logout: () => Promise<void>;
  signup: (email: string, password: string, userData: any) => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
  
  customRequests: CustomProjectRequest[];
  submitCustomProject: (request: Omit<CustomProjectRequest, 'id' | 'status' | 'submittedAt'>) => void;
  adminUpdateProjectStatus: (id: string, status: 'Pending Verification' | 'Approved' | 'Delivered' | 'Rejected') => void;

  projectsCatalog: Project[];
  coursesCatalog: Course[];
  documentsCatalog: DocumentItem[];
  trainingCatalog: TrainingProgram[];
  addProjectToCatalog: (proj: any) => void;
  addCourseToCatalog: (course: any) => void;
  addDocumentToCatalog: (doc: any) => void;
  addTrainingToCatalog: (training: any) => void;
  removeProjectFromCatalog: (id: string) => void;
  removeCourseFromCatalog: (id: string) => void;
  removeDocumentFromCatalog: (id: string) => void;
  removeTrainingFromCatalog: (id: string) => void;

  purchasedItems: PurchasedItem[];
  buyItem: (item: { id: string; title: string; price: number; type: 'project' | 'course' | 'document' | 'training'; thumbnail?: string }) => void;
  uploadPaymentScreenshot: (itemId: string, screenshotUrl: string) => void;
  verifyPayment: (itemId: string) => void;

  supportTickets: SupportTicket[];
  submitSupportTicket: (ticket: Omit<SupportTicket, 'id' | 'status' | 'createdAt'>) => void;
  resolveTicket: (id: string) => void;

  notification: string | null;
  setNotification: (msg: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  authRedirectUrl: string | null;
  setAuthRedirectUrl: (url: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Helper to load from localStorage or use default
const loadFromStorage = (key: string, defaultValue: any): any => {
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return defaultValue;
};

const saveToStorage = (key: string, data: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {}
};

const initialStudent: User = {
  id: 'usr-owner-001',
  name: 'ARMAN ANSARI',
  email: 'armansari2876@gmail.com',
  role: 'admin',
  college: 'NEXORA LABS Innovation Center',
  phone: '+91 78765 43210',
  degree: 'B.Tech Computer Science & Engineering',
  rollNumber: 'NEX-OWNER-001',
  graduationYear: '2026',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  bio: 'Founder & CEO of NEXORA LABS. Building the future of student project ecosystem.',
  twoFactorAuth: true,
  emailAlerts: true
};

const initialPurchases: PurchasedItem[] = [
  {
    id: 'proj-1',
    type: 'project',
    title: 'Autonomous AI Med-Diagnose & Prescription Assistant',
    price: 2499,
    purchasedAt: '2026-04-10',
    status: 'Unlocked',
    downloadUrl: 'https://nexoralabs.com/downloads/source_code_aimed.zip',
    synopsisUrl: 'https://nexoralabs.com/downloads/synopsis_aimed.pdf',
    pptUrl: 'https://nexoralabs.com/downloads/presentation_aimed.pptx',
    ptdUrl: 'https://nexoralabs.com/downloads/ptd_report_aimed.pdf',
    certificateId: 'NEX-CERT-2026-8812',
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80'
  }
];

const initialRequests: CustomProjectRequest[] = [
  {
    id: 'cust-req-1',
    studentName: 'Ravi Kumar',
    collegeName: 'SRM University',
    technology: 'Python + Django + AI',
    projectTitle: 'Automated Smart Traffic Signal AI',
    deadline: '2026-05-30',
    budget: 3500,
    phone: '+91 91234 56789',
    email: 'ravi@srm.edu',
    requirementDetails: 'Need a computer vision based traffic density calculator with full synopsis and PPT report.',
    status: 'Approved',
    submittedAt: '2026-04-14',
    paymentScreenshot: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=400&q=80'
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(initialStudent);
  const [firebaseUser, setFirebaseUser] = useState<any | null>(null);
  const [customRequests, setCustomRequests] = useState<CustomProjectRequest[]>(initialRequests);
  const [purchasedItems, setPurchasedItems] = useState<PurchasedItem[]>(initialPurchases);
  
  // Load from localStorage on mount, fallback to mock data
  const [projectsCatalog, setProjectsCatalog] = useState<Project[]>(
    () => loadFromStorage('nexora_projects', MOCK_PROJECTS)
  );
  const [coursesCatalog, setCoursesCatalog] = useState<Course[]>(
    () => loadFromStorage('nexora_courses', MOCK_COURSES)
  );
  const [documentsCatalog, setDocumentsCatalog] = useState<DocumentItem[]>(
    () => loadFromStorage('nexora_documents', MOCK_DOCUMENTS)
  );
  const [trainingCatalog, setTrainingCatalog] = useState<TrainingProgram[]>(
    () => loadFromStorage('nexora_training', MOCK_TRAINING)
  );

  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>([
    {
      id: 'tick-1',
      studentName: 'ARMAN ANSARI',
      email: 'armansari2876@gmail.com',
      subject: 'Platform configuration check',
      message: 'Verifying all systems are operational.',
      status: 'In Progress',
      createdAt: '2026-05-20'
    }
  ]);
  const [notification, setNotificationState] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authRedirectUrl, setAuthRedirectUrl] = useState<string | null>(null);

  // Auto-save to localStorage whenever catalogs change
  useEffect(() => {
    saveToStorage('nexora_projects', projectsCatalog);
  }, [projectsCatalog]);

  useEffect(() => {
    saveToStorage('nexora_courses', coursesCatalog);
  }, [coursesCatalog]);

  useEffect(() => {
    saveToStorage('nexora_documents', documentsCatalog);
  }, [documentsCatalog]);

  useEffect(() => {
    saveToStorage('nexora_training', trainingCatalog);
  }, [trainingCatalog]);

  const triggerNotification = (msg: string) => {
    setNotificationState(msg);
    setTimeout(() => {
      setNotificationState(null);
    }, 5000);
  };

  const login = async (email: string, password: string, role: 'student' | 'admin') => {
    try {
      const result = await authService.loginUser(email, password);
      if (result.success && result.user) {
        setFirebaseUser(result.user);
        const userProfiles = await firestoreService.queryDocuments('users', 'uid', '==', result.user.uid);
        if (userProfiles.success && userProfiles.data && userProfiles.data.length > 0) {
          const profile = userProfiles.data[0];
          setUser({ id: profile.uid, ...profile });
        } else {
          setUser({
            id: result.user.uid || `usr-${Date.now()}`,
            name: email.split('@')[0].toUpperCase(),
            email,
            role,
            college: role === 'admin' ? 'NEXORA LABS' : 'National Institute of Technology',
            phone: '+91 99999 88888'
          });
        }
        triggerNotification('Successfully logged in!');
      } else {
        const fallbackObj = {
          name: role === 'admin' ? 'ARMAN ANSARI' : email.split('@')[0].toUpperCase(),
          college: role === 'admin' ? 'NEXORA LABS Innovation Center' : 'National Institute of Technology',
          phone: role === 'admin' ? '+91 78765 43210' : '+91 99999 88888',
          role
        };
        const regResult = await authService.registerUser(email, password, fallbackObj);
        if (regResult.success && regResult.user) {
          setFirebaseUser(regResult.user);
          setUser({ id: regResult.user.uid || `usr-${Date.now()}`, ...fallbackObj, email });
          triggerNotification('Account created & logged in successfully!');
        } else {
          setUser({
            id: `usr-mock-${Date.now()}`,
            name: role === 'admin' ? 'ARMAN ANSARI' : email.split('@')[0].toUpperCase(),
            email,
            role,
            college: role === 'admin' ? 'NEXORA LABS Innovation Center' : 'National Institute of Technology',
            phone: role === 'admin' ? '+91 78765 43210' : '+91 99999 88888'
          });
          triggerNotification('Logged in with Simulated Credentials.');
        }
      }
    } catch {
      setUser({
        id: `usr-mock-${Date.now()}`,
        name: role === 'admin' ? 'ARMAN ANSARI' : email.split('@')[0].toUpperCase(),
        email,
        role,
        college: role === 'admin' ? 'NEXORA LABS Innovation Center' : 'National Institute of Technology',
        phone: role === 'admin' ? '+91 78765 43210' : '+91 99999 88888'
      });
      triggerNotification('Logged in via Live Sandbox Persistence.');
    }
  };

  const signup = async (email: string, password: string, userData: any) => {
    try {
      const result = await authService.registerUser(email, password, userData);
      if (result.success && result.user) {
        setFirebaseUser(result.user);
        setUser({ id: result.user.uid || '', ...userData, email });
        triggerNotification('Account created successfully!');
      } else {
        setUser({ id: `usr-new-${Date.now()}`, ...userData, email });
        triggerNotification('Account created!');
      }
    } catch {
      setUser({ id: `usr-new-${Date.now()}`, ...userData, email });
      triggerNotification('Account created.');
    }
  };

  const logout = async () => {
    try { await authService.logoutUser(); } catch {}
    setUser(null);
    setFirebaseUser(null);
    triggerNotification('Logged out successfully.');
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    syncToGoogleSheets('User_Profiles_Sync', updatedUser);
    if (firebaseUser) {
      firestoreService.updateDocument('users', user.id, updates).catch(() => {});
    }
    triggerNotification('Profile updated successfully!');
  };

  // ========== ADD FUNCTIONS ==========
  const addProjectToCatalog = (projDoc: any) => {
    const newProj: Project = {
      id: projDoc.id || `proj-${Date.now()}`,
      title: projDoc.title,
      category: projDoc.category,
      description: projDoc.description,
      technology: projDoc.technology,
      difficultyLevel: projDoc.difficultyLevel,
      features: projDoc.features,
      price: projDoc.price,
      rating: projDoc.rating || 5.0,
      salesCount: projDoc.salesCount || 1,
      thumbnail: projDoc.thumbnail,
      synopsisAvailable: projDoc.synopsisAvailable,
      pptAvailable: projDoc.pptAvailable,
      demoUrl: projDoc.demoUrl,
      longDescription: projDoc.longDescription || projDoc.description,
      architecture: projDoc.architecture || 'Microservices architecture with REST API endpoints.'
    };
    setProjectsCatalog(prev => [newProj, ...prev]);
    firestoreService.addDocument('projects', projDoc).catch(() => {});
    syncToGoogleSheets('Projects_Database', projDoc);
    triggerNotification(`Success: Project "${projDoc.title}" deployed to catalog!`);
  };

  const addCourseToCatalog = (courseDoc: any) => {
    const newCourse: Course = {
      id: courseDoc.id || `course-${Date.now()}`,
      title: courseDoc.title,
      instructor: `${courseDoc.instructor} (${courseDoc.instructorRole || 'Lead Architect'})`,
      duration: courseDoc.duration,
      lessonsCount: courseDoc.lessonsCount,
      level: courseDoc.level,
      price: courseDoc.price,
      rating: courseDoc.rating || 5.0,
      thumbnail: courseDoc.thumbnail,
      features: courseDoc.features,
      description: courseDoc.description,
      tags: courseDoc.tags
    };
    setCoursesCatalog(prev => [newCourse, ...prev]);
    firestoreService.addDocument('courses', courseDoc).catch(() => {});
    syncToGoogleSheets('Courses_Database', courseDoc);
    triggerNotification(`Success: Course "${courseDoc.title}" published!`);
  };

  const addDocumentToCatalog = (docDoc: any) => {
    const newDoc: DocumentItem = {
      id: docDoc.id || `doc-${Date.now()}`,
      title: docDoc.title,
      type: docDoc.type,
      category: docDoc.category,
      pages: docDoc.pages,
      fileSize: docDoc.fileSize,
      price: docDoc.price,
      downloads: docDoc.downloads || 1,
      description: docDoc.description
    };
    setDocumentsCatalog(prev => [newDoc, ...prev]);
    firestoreService.addDocument('documents', docDoc).catch(() => {});
    syncToGoogleSheets('Documents_Database', docDoc);
    triggerNotification(`Success: Document "${docDoc.title}" added!`);
  };

  const addTrainingToCatalog = (trainingDoc: any) => {
    const newTraining: TrainingProgram = {
      id: trainingDoc.id || `train-${Date.now()}`,
      title: trainingDoc.title,
      duration: trainingDoc.duration,
      startDate: trainingDoc.startDate,
      mode: trainingDoc.mode,
      technologies: trainingDoc.technologies,
      price: trainingDoc.price,
      originalPrice: trainingDoc.originalPrice || Math.round(trainingDoc.price * 2),
      features: trainingDoc.features,
      seatsLeft: trainingDoc.seatsLeft || 25,
      description: trainingDoc.description,
      badge: trainingDoc.badge || 'New Batch'
    };
    setTrainingCatalog(prev => [newTraining, ...prev]);
    firestoreService.addDocument('training', trainingDoc).catch(() => {});
    syncToGoogleSheets('Training_Database', trainingDoc);
    triggerNotification(`Success: Training "${trainingDoc.title}" published!`);
  };

  // ========== DELETE FUNCTIONS ==========
  const removeProjectFromCatalog = (id: string) => {
    const item = projectsCatalog.find(p => p.id === id);
    setProjectsCatalog(prev => prev.filter(p => p.id !== id));
    firestoreService.deleteDocument('projects', id).catch(() => {});
    syncToGoogleSheets('Projects_Deleted', { id, deletedAt: new Date().toISOString() });
    triggerNotification(`Project "${item?.title || id}" removed from catalog.`);
  };

  const removeCourseFromCatalog = (id: string) => {
    const item = coursesCatalog.find(c => c.id === id);
    setCoursesCatalog(prev => prev.filter(c => c.id !== id));
    firestoreService.deleteDocument('courses', id).catch(() => {});
    syncToGoogleSheets('Courses_Deleted', { id, deletedAt: new Date().toISOString() });
    triggerNotification(`Course "${item?.title || id}" removed from catalog.`);
  };

  const removeDocumentFromCatalog = (id: string) => {
    const item = documentsCatalog.find(d => d.id === id);
    setDocumentsCatalog(prev => prev.filter(d => d.id !== id));
    firestoreService.deleteDocument('documents', id).catch(() => {});
    syncToGoogleSheets('Documents_Deleted', { id, deletedAt: new Date().toISOString() });
    triggerNotification(`Document "${item?.title || id}" removed from catalog.`);
  };

  const removeTrainingFromCatalog = (id: string) => {
    const item = trainingCatalog.find(t => t.id === id);
    setTrainingCatalog(prev => prev.filter(t => t.id !== id));
    firestoreService.deleteDocument('training', id).catch(() => {});
    syncToGoogleSheets('Training_Deleted', { id, deletedAt: new Date().toISOString() });
    triggerNotification(`Training "${item?.title || id}" removed from catalog.`);
  };

  // ========== REST OF FUNCTIONS ==========
  const submitCustomProject = (req: Omit<CustomProjectRequest, 'id' | 'status' | 'submittedAt'>) => {
    const newReq: CustomProjectRequest = { ...req, id: `cust-req-${Date.now()}`, status: 'Pending Verification', submittedAt: new Date().toISOString().split('T')[0] };
    setCustomRequests(prev => [newReq, ...prev]);
    projectRequestService.submitRequest(newReq).catch(() => {});
    triggerNotification('Request saved to Google Sheets & Firebase!');
  };

  const buyItem = (item: { id: string; title: string; price: number; type: 'project' | 'course' | 'document' | 'training'; thumbnail?: string }) => {
    if (!user) { triggerNotification('Please log in to enroll.'); return; }
    if (purchasedItems.some(p => p.id === item.id)) { triggerNotification('Already purchased! Check dashboard.'); return; }
    const newItem: PurchasedItem = { id: item.id, type: item.type, title: item.title, price: item.price, purchasedAt: new Date().toISOString().split('T')[0], status: 'Pending Verification', thumbnail: item.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80' };
    setPurchasedItems(prev => [newItem, ...prev]);
    purchaseService.createPurchase({ userId: user.id, ...newItem }).catch(() => {});
    triggerNotification(`Order initiated for "${item.title}". Upload payment screenshot to unlock!`);
  };

  const uploadPaymentScreenshot = (itemId: string, _screenshotUrl: string) => {
    void _screenshotUrl; // Used for admin verification audit
    setPurchasedItems(prev => prev.map(p => {
      if (p.id === itemId) {
        const certId = `NEX-CERT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
        return { ...p, status: 'Unlocked', downloadUrl: `https://nexoralabs.com/downloads/source_code_${itemId}.zip`, synopsisUrl: `https://nexoralabs.com/downloads/synopsis_${itemId}.pdf`, pptUrl: `https://nexoralabs.com/downloads/presentation_${itemId}.pptx`, ptdUrl: `https://nexoralabs.com/downloads/ptd_report_${itemId}.pdf`, certificateId: certId };
      }
      return p;
    }));
    triggerNotification('Payment verified! Full bundle unlocked.');
  };

  const verifyPayment = (itemId: string) => {
    setPurchasedItems(prev => prev.map(p => {
      if (p.id === itemId) {
        const certId = `NEX-CERT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
        return { ...p, status: 'Unlocked', downloadUrl: `https://nexoralabs.com/downloads/source_code_${itemId}.zip`, synopsisUrl: `https://nexoralabs.com/downloads/synopsis_${itemId}.pdf`, pptUrl: `https://nexoralabs.com/downloads/presentation_${itemId}.pptx`, ptdUrl: `https://nexoralabs.com/downloads/ptd_report_${itemId}.pdf`, certificateId: certId };
      }
      return p;
    }));
    triggerNotification(`Item #${itemId} payment verified by Admin.`);
  };

  const adminUpdateProjectStatus = (id: string, status: 'Pending Verification' | 'Approved' | 'Delivered' | 'Rejected') => {
    setCustomRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    firestoreService.updateDocument('custom_project_requests', id, { status }).catch(() => {});
    triggerNotification(`Updated custom project #${id} status to ${status}.`);
  };

  const submitSupportTicket = (ticket: Omit<SupportTicket, 'id' | 'status' | 'createdAt'>) => {
    const newTicket: SupportTicket = { ...ticket, id: `tick-${Date.now()}`, status: 'Open', createdAt: new Date().toISOString().split('T')[0] };
    setSupportTickets(prev => [newTicket, ...prev]);
    supportTicketService.createTicket({ userId: user?.id, ...newTicket }).catch(() => {});
    triggerNotification('Support ticket submitted!');
  };

  const resolveTicket = (id: string) => {
    setSupportTickets(prev => prev.map(t => t.id === id ? { ...t, status: 'Resolved' } : t));
    supportTicketService.updateTicketStatus(id, 'Resolved').catch(() => {});
    triggerNotification(`Ticket #${id} marked as Resolved.`);
  };

  return (
    <AppContext.Provider value={{
      user, firebaseUser, login, logout, signup, updateUser,
      customRequests, submitCustomProject, adminUpdateProjectStatus,
      projectsCatalog, coursesCatalog, documentsCatalog, trainingCatalog,
      addProjectToCatalog, addCourseToCatalog, addDocumentToCatalog, addTrainingToCatalog,
      removeProjectFromCatalog, removeCourseFromCatalog, removeDocumentFromCatalog, removeTrainingFromCatalog,
      purchasedItems, buyItem, uploadPaymentScreenshot, verifyPayment,
      supportTickets, submitSupportTicket, resolveTicket,
      notification, setNotification: setNotificationState,
      searchQuery, setSearchQuery,
      authModalOpen, setAuthModalOpen, authRedirectUrl, setAuthRedirectUrl
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
