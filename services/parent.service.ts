import { api } from './api';
import type { ScheduleSlot, Grade, PaginatedResponse, Homework, Attendance } from '@/types';

export const parentService = {
  getChildSchedule: (childId: string) =>
    api.get<ScheduleSlot[]>(`/api/parent/children/${childId}/schedule`),

  getChildGrades: (childId: string, page = 1, limit = 20) =>
    api.get<PaginatedResponse<Grade>>(`/api/parent/children/${childId}/grades?page=${page}&limit=${limit}`),

  getChildGradeById: (childId: string, gradeId: string) =>
    api.get<Grade>(`/api/parent/children/${childId}/grades/${gradeId}`),

  getChildHomework: (childId: string, page = 1, limit = 20) =>
    api.get<PaginatedResponse<Homework>>(`/api/parent/children/${childId}/homework?page=${page}&limit=${limit}`),

  getChildHomeworkById: (childId: string, homeworkId: string) =>
    api.get<Homework>(`/api/parent/children/${childId}/homework/${homeworkId}`),

  getChildAttendance: (childId: string, page = 1, limit = 20) =>
    api.get<PaginatedResponse<Attendance>>(`/api/parent/children/${childId}/attendance?page=${page}&limit=${limit}`),

  getChildAttendanceById: (childId: string, attendanceId: string) =>
    api.get<Attendance>(`/api/parent/children/${childId}/attendance/${attendanceId}`),
};
