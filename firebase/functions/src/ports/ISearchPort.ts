/**
 * Port interface for search adapters (e.g. Algolia).
 */

/** Represents a full teacher record to be indexed. */
export interface TeacherRecord {
  objectID: string;
  name: string;
  school: string;
  city: string;
  phoneticNameKey: string;
}

/** Represents a teacher result returned from a search query. */
export interface TeacherSearchResult {
  objectID: string;
  name: string;
  school: string;
  city: string;
}

export interface ISearchPort {
  /**
   * Index (add or update) a teacher record.
   */
  indexTeacher(teacher: TeacherRecord): Promise<void>;

  /**
   * Search for teachers matching a query string.
   *
   * @param query   - Free-text search query.
   * @param filters - Optional filter expression (provider-specific syntax).
   */
  searchTeachers(
    query: string,
    filters?: string,
  ): Promise<TeacherSearchResult[]>;

  /**
   * Delete a teacher record by its ID.
   */
  deleteTeacher(teacherId: string): Promise<void>;
}
