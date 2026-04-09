import { api } from './api';
import type { ScheduleSlot, Grade, PaginatedResponse, Homework, Attendance, Invoice, FinancialSummary } from '@/types';

export const studentService = {
  getWeekSchedule: () =>
    api.get<ScheduleSlot[]>('/api/my/schedule/week'),

  getTodaySchedule: () =>
    api.get<ScheduleSlot[]>('/api/my/schedule/today'),

  getGrades: (page = 1, limit = 20) =>
    api.get<PaginatedResponse<Grade>>(`/api/my/grades?page=${page}&limit=${limit}`),

  getGradeById: (gradeId: string) =>
    api.get<Grade>(`/api/my/grades/${gradeId}`),

  getHomework: (page = 1, limit = 20) =>
    api.get<PaginatedResponse<Homework>>(`/api/my/homework?page=${page}&limit=${limit}`),

  getHomeworkById: (homeworkId: string) =>
    api.get<Homework>(`/api/my/homework/${homeworkId}`),

  getAttendance: (page = 1, limit = 20) =>
    api.get<PaginatedResponse<Attendance>>(`/api/my/attendance?page=${page}&limit=${limit}`),

  getAttendanceById: (attendanceId: string) =>
    api.get<Attendance>(`/api/my/attendance/${attendanceId}`),

  getInvoices: () =>
    api.get<Invoice[]>('/api/my/invoices'),

  getInvoiceById: (invoiceId: string) =>
    api.get<Invoice>(`/api/my/invoices/${invoiceId}`),

  getFinancialSummary: () =>
    api.get<FinancialSummary>('/api/my/financial-summary'),
};
