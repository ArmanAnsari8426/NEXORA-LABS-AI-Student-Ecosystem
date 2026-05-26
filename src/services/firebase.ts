/**
 * NEXORA LABS - Production Backend Service Architecture
 * Supports Firebase Firestore & MongoDB-style NoSQL document structures.
 * Features auto-sync to LocalStorage/Mock fallback when API keys are not initialized.
 */

// ==========================================
// BACKEND DATABASE SCHEMAS (Firestore / MongoDB)
// ==========================================

export interface UserDocument {
  uid: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  college: string;
  phone: string;
  createdAt: string;
}

export interface ProjectDocument {
  id: string;
  title: string;
  category: 'AI/ML' | 'Python' | 'MERN Stack' | 'React' | 'Cyber Security' | 'Java' | 'Android' | 'Networking' | 'Data Science';
  description: string;
  longDescription: string;
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
  architecture: string;
  sourceCodeUrl?: string;
  synopsisUrl?: string;
  pptUrl?: string;
  ptdUrl?: string;
  createdAt: string;
}

export interface CourseDocument {
  id: string;
  title: string;
  instructor: string;
  instructorRole: string;
  duration: string;
  lessonsCount: number;
  level: string;
  price: number;
  rating: number;
  thumbnail: string;
  features: string[];
  description: string;
  tags: string[];
  curriculum: { module: string; title: string; duration: string; freePreview?: boolean }[];
  sourceCodeUrl?: string;
  notesUrl?: string;
  createdAt: string;
}

export interface DocumentItemDocument {
  id: string;
  title: string;
  type: 'Synopsis' | 'PPT' | 'PTD Report' | 'Research Document' | 'Final Report';
  category: string;
  pages: number;
  fileSize: string;
  price: number;
  downloads: number;
  description: string;
  downloadUrl?: string;
  createdAt: string;
}

export interface CustomProjectRequestDocument {
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

export interface PurchaseDocument {
  id: string;
  userId: string;
  itemId: string;
  type: 'project' | 'course' | 'document' | 'training';
  title: string;
  price: number;
  purchasedAt: string;
  status: 'Pending Verification' | 'Unlocked';
  paymentScreenshot?: string;
  downloadUrl?: string;
  synopsisUrl?: string;
  pptUrl?: string;
  ptdUrl?: string;
  certificateId?: string;
  thumbnail?: string;
}

// Helper to simulate Google Sheets webhook POST
export const syncToGoogleSheets = async (sheetName: string, data: Record<string, any>) => {
  console.log(`[Google Sheets Webhook Sync] Appending row to Sheet: "${sheetName}"`);
  console.log(JSON.stringify(data, null, 2));
  // In a real Node/Express backend or Firebase Function, this performs an axios.post to Google Sheets API / Zapier Webhook.
  return true;
};

// Simulated Email Notification Dispatcher
export const sendAdminEmailAlert = async (subject: string, details: Record<string, any>) => {
  console.log(`[Email Dispatcher] Sending email alert to admin@nexoralabs.com`);
  console.log(`Subject: ${subject}`);
  console.log(`Payload:`, details);
  return true;
};
