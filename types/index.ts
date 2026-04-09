// ─── Auth ────────────────────────────────────────────────────────────────────

export type Role = 'STUDENT' | 'PARENT';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
  nom: string;
  prenom: string;
  role: Role;
  schoolId: string;
}

export interface StudentPermissions {
  canViewGrades: boolean;
  canViewAttendance: boolean;
  canUpdateProfile: boolean;
}

export interface ParentPermissions {
  canViewChildrenGrades: boolean;
  canViewChildrenAttendance: boolean;
  canUpdateProfile: boolean;
  canContactTeachers: boolean;
}

export interface StudentLoginResponse {
  accessToken: string;
  user: AuthUser;
  studentProfile: StudentProfile;
  permissions: StudentPermissions;
}

export interface ParentLoginResponse {
  accessToken: string;
  user: AuthUser;
  parentProfile: ParentProfile;
  permissions: ParentPermissions;
}

// ─── Profiles ────────────────────────────────────────────────────────────────

export interface Level {
  id: string;
  name: string;
  code: string;
  section: string;
  cycle: string;
}

export interface Group {
  id: string;
  name: string;
  section: string;
  level: Pick<Level, 'name' | 'code'>;
}

export interface StudentProfile {
  id: string;
  cne: string;
  dateOfBirth: string | null;
  age: number | null;
  levelId: string;
  groupId: string;
  parentId: string | null;
  level: Level;
  group: Group;
  parent: { id: string; nom: string; prenom: string; phone: string } | null;
}

export interface ChildSummary {
  id: string;
  nom: string;
  prenom: string;
  cne: string;
  age: number | null;
  level: Pick<Level, 'name' | 'code'>;
  group: Pick<Group, 'name'>;
  isActive: boolean;
}

export interface ParentProfile {
  id: string;
  students: ChildSummary[];
  totalChildren: number;
}

// ─── Schedule ────────────────────────────────────────────────────────────────

export interface ScheduleSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  subject: string;
  teacher: string;
  room: string;
}

// ─── Grades ──────────────────────────────────────────────────────────────────

export interface Grade {
  id: string;
  subject: string;
  value: number;
  maxValue: number;
  coefficient: number;
  type: string;
  date: string;
  comment: string | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

// ─── Homework ────────────────────────────────────────────────────────────────

export interface Homework {
  id: string;
  subject: string;
  title: string;
  description: string;
  dueDate: string;
  isCompleted: boolean;
}

// ─── Attendance ──────────────────────────────────────────────────────────────

export interface Attendance {
  id: string;
  date: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE';
  subject: string;
  justification: string | null;
}

// ─── Finance ─────────────────────────────────────────────────────────────────

export interface Invoice {
  id: string;
  title: string;
  amount: number;
  status: 'PAID' | 'PENDING' | 'OVERDUE';
  dueDate: string;
  paidAt: string | null;
}

export interface FinancialSummary {
  totalDue: number;
  totalPaid: number;
  balance: number;
  invoices: Invoice[];
}
