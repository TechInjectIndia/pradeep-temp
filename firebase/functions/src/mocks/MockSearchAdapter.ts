import { ISearchPort, TeacherRecord, TeacherSearchResult } from '../ports';

export class MockSearchAdapter implements ISearchPort {
  private teachers: Map<string, TeacherRecord> = new Map();

  async indexTeacher(teacher: TeacherRecord): Promise<void> {
    this.teachers.set(teacher.objectID, teacher);
  }

  async searchTeachers(query: string, _filters?: string): Promise<TeacherSearchResult[]> {
    const queryLower = query.toLowerCase();
    const results: TeacherSearchResult[] = [];

    for (const teacher of this.teachers.values()) {
      const searchable = `${teacher.name} ${teacher.school} ${teacher.city}`.toLowerCase();
      if (
        searchable.includes(queryLower) ||
        queryLower.split(' ').some((term) => searchable.includes(term))
      ) {
        results.push({
          objectID: teacher.objectID,
          name: teacher.name,
          school: teacher.school,
          city: teacher.city,
        });
      }
    }

    return results.slice(0, 20);
  }

  async deleteTeacher(teacherId: string): Promise<void> {
    this.teachers.delete(teacherId);
  }

  // Test helpers
  getIndexedCount(): number {
    return this.teachers.size;
  }
  reset(): void {
    this.teachers.clear();
  }
  getAll(): TeacherRecord[] {
    return Array.from(this.teachers.values());
  }
}
