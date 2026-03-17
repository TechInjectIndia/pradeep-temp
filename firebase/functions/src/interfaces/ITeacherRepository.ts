/**
 * Repository interface for Teacher entity persistence.
 */
export interface ITeacherRepository {
  getById(teacherId: string): Promise<any>;
  create(data: any): Promise<string>;
  update(teacherId: string, data: any): Promise<void>;
  addPhone(teacherId: string, phone: string): Promise<void>;
  addEmail(teacherId: string, email: string): Promise<void>;
}
