import algoliasearch, { SearchIndex } from 'algoliasearch';
import { config } from '../../config';

let teacherIndex: SearchIndex | null = null;

function getTeacherIndex(): SearchIndex {
  if (!teacherIndex) {
    const client = algoliasearch(config.algolia.appId, config.algolia.apiKey);
    teacherIndex = client.initIndex(config.algolia.teacherIndex);
  }
  return teacherIndex;
}

export interface TeacherRecord {
  objectID: string;
  name: string;
  school: string;
  city: string;
  phoneticNameKey: string;
}

export interface TeacherSearchResult {
  objectID: string;
  name: string;
  school: string;
  city: string;
}

/**
 * Index (add or update) a teacher record in Algolia.
 */
export async function indexTeacher(teacher: TeacherRecord): Promise<void> {
  const index = getTeacherIndex();
  await index.saveObject(teacher);
}

/**
 * Search for teachers in Algolia.
 */
export async function searchTeachers(
  query: string,
  filters?: string
): Promise<TeacherSearchResult[]> {
  const index = getTeacherIndex();

  const { hits } = await index.search<TeacherSearchResult>(query, {
    filters,
    attributesToRetrieve: ['objectID', 'name', 'school', 'city'],
  });

  return hits.map((hit) => ({
    objectID: hit.objectID,
    name: hit.name,
    school: hit.school,
    city: hit.city,
  }));
}

/**
 * Delete a teacher record from Algolia by ID.
 */
export async function deleteTeacher(teacherId: string): Promise<void> {
  const index = getTeacherIndex();
  await index.deleteObject(teacherId);
}
