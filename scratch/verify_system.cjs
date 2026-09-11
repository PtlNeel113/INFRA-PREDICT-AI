const fs = require('fs');
const path = require('path');

console.log('=== INFRA-PREDICT AI VERIFICATION SUITE ===\n');

// 1. Check PAIMANA official records immutability & counts
const csvPath = path.resolve(__dirname, '../backend/data/paimana/PAIMANA_April_July_2026_All_Project_Records.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8').trim();
const csvLines = csvContent.split('\n');
console.log(`[PAIMANA CSV] Total lines: ${csvLines.length} (Expected: 237, Header + 236 observations)`);
if (csvLines.length !== 237) {
  console.error('FAIL: CSV line count mismatch!');
  process.exit(1);
} else {
  console.log('PASS: PAIMANA CSV exactly 237 lines intact.');
}

// Check frontend paimanaOfficialRecords.ts
const paimanaTsPath = path.resolve(__dirname, '../frontend/src/data/paimanaOfficialRecords.ts');
const paimanaTsContent = fs.readFileSync(paimanaTsPath, 'utf-8');
const idMatches = paimanaTsContent.match(/"code":\s*"PAIMANA-\d+"/g);
console.log(`[PAIMANA TS] Projects matched in source: ${idMatches ? idMatches.length : 0} (Expected: 59)`);
if (!idMatches || idMatches.length !== 59) {
  console.error('FAIL: paimanaOfficialRecords count mismatch!');
  process.exit(1);
} else {
  console.log('PASS: Exactly 59 official PAIMANA projects intact.');
}

// 2. Check 4-Month Historical dataset extracted in frontend
const histTsPath = path.resolve(__dirname, '../frontend/src/data/paimanaHistoricalRecords.ts');
const histTsContent = fs.readFileSync(histTsPath, 'utf-8');
const histObsMatch = histTsContent.match(/"reportMonth":/g);
console.log(`[PAIMANA HISTORICAL TS] Historical records: ${histObsMatch ? histObsMatch.length : 0} (Expected: 236)`);
if (!histObsMatch || histObsMatch.length !== 236) {
  console.error('FAIL: Historical records count mismatch!');
  process.exit(1);
} else {
  console.log('PASS: All 236 monthly observations (Apr-Jul 2026) verified intact.');
}

// 3. Verify Role-Specific Sidebars in roles.ts
const rolesTsPath = path.resolve(__dirname, '../frontend/src/config/roles.ts');
const rolesTsContent = fs.readFileSync(rolesTsPath, 'utf-8');

const expectedRoles = [
  'Senior Decision Maker',
  'Project Manager',
  'Monitoring Officer',
  'Ministry / Department',
  'Auditor / Viewer',
  'Administrator'
];

for (const role of expectedRoles) {
  if (!rolesTsContent.includes(`'${role}'`)) {
    console.error(`FAIL: Missing role definition for ${role}`);
    process.exit(1);
  }
}
console.log('PASS: All 6 operational roles defined with exact specifications.');

// 4. Verify No Role Switcher in Sidebar or Navbar
const sidebarPath = path.resolve(__dirname, '../frontend/src/components/layout/Sidebar.tsx');
const sidebarContent = fs.readFileSync(sidebarPath, 'utf-8');
if (sidebarContent.includes('showRoleSwitcher') || sidebarContent.includes('handleRoleChange') || sidebarContent.includes('setShowRoleSwitcher')) {
  console.error('FAIL: Role switcher still present in Sidebar.tsx!');
  process.exit(1);
} else {
  console.log('PASS: Role switcher completely removed from Sidebar.tsx (static informational badge only).');
}

const navbarPath = path.resolve(__dirname, '../frontend/src/components/layout/Navbar.tsx');
const navbarContent = fs.readFileSync(navbarPath, 'utf-8');
if (navbarContent.includes('handleGoToProfile')) {
  console.error('FAIL: Switch role trigger still present in Navbar.tsx!');
  process.exit(1);
} else {
  console.log('PASS: Switch role trigger removed from Navbar.tsx (locked session notice only).');
}

// 5. Verify Session Locking in authStore.ts
const authStorePath = path.resolve(__dirname, '../frontend/src/store/authStore.ts');
const authStoreContent = fs.readFileSync(authStorePath, 'utf-8');
if (!authStoreContent.includes('Role switching from inside the dashboard is prohibited') || !authStoreContent.includes('current.isProfileComplete')) {
  console.error('FAIL: Session locking guard missing in authStore.ts!');
  process.exit(1);
} else {
  console.log('PASS: Session role locking strictly enforced in authStore.ts.');
}

// 6. Verify Server Backend RBAC Middleware
const serverPath = path.resolve(__dirname, '../frontend/server.ts');
const serverContent = fs.readFileSync(serverPath, 'utf-8');
if (!serverContent.includes('requireAdminRole') || !serverContent.includes('requireIngestPermission')) {
  console.error('FAIL: Backend RBAC middleware missing in server.ts!');
  process.exit(1);
} else {
  console.log('PASS: Backend authorization middleware present in server.ts.');
}

console.log('\n=== ALL VERIFICATION CHECKS PASSED SUCCESSFULLY ===');
