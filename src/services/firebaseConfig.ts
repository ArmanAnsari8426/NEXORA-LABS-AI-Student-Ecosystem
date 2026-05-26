// Firebase Configuration
export const firebaseConfig = {
  apiKey: "AIzaSyCX6CL_FJuv1RCtQ5szH6hAcpNQw_22X7E",
  authDomain: "nexora-labs.firebaseapp.com",
  projectId: "nexora-labs",
  storageBucket: "nexora-labs.firebasestorage.app",
  messagingSenderId: "769121876573",
  appId: "1:769121876573:web:9b0f82e4a33f4b9e42ebb4",
  measurementId: "G-7MW87C9RVM"
};

// AppSheet & Google Sheets Configuration
export const appSheetConfig = {
  appName: "NexoraLeads-472898382-26-05-14",
  appId: "598e8866-0d27-4c7d-a3b0-7d8459a2d2eb",
  googleSheetId: "1DRJvHqgP2aGggtwxkcSWqZb7SdyiP9yOwumimZvR3IY",
  googleSheetUrl: "https://docs.google.com/spreadsheets/d/1DRJvHqgP2aGggtwxkcSWqZb7SdyiP9yOwumimZvR3IY/edit?gid=0#gid=0",
  databaseId: "6r2_tN6rkq4eM16Pg28im0",
  // AppSheet API endpoint format for adding actions to Google Sheets automatically
  apiEndpoint: "https://api.appsheet.com/api/v2/apps/598e8866-0d27-4c7d-a3b0-7d8459a2d2eb/tables/",
  applicationAccessKey: "YOUR_APPSHEET_ACCESS_KEY_HERE" // Can be configured inside your AppSheet App -> Integrations -> API
};

// Exclusive Master Super Admin Authentication Controls
export const superAdminConfig = {
  masterEmail: "armansari2876@gmail.com",
  ownerName: "ARMAN ANSARI",
  // Only the creator possessing this exact master passcode key can bypass the security lock screen
  masterSecretPasscode: "ARMAN-SUPER-ADMIN-2876",
  sessionStorageKey: "nexora_superadmin_unlocked_status"
};
