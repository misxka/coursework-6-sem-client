import axios from 'axios';

export interface ICourse {
  id: number;
  title: string;
  price: number;
  language: string;
  level: string;
  isOnline: boolean;
  tasks: [];
}

export interface ICoursesPagingResponse {
  content: [ICourse];
  first: boolean;
  last: boolean;
  size: number;
  totalPages: number;
  empty: boolean;
}

export type DeleteResponse = {
  status: number;
  message: string;
};

export type UpdateResponse = {
  course: ICourse;
} & DeleteResponse;

export interface FilterRequest {
  title: string;
  priceMin: number;
  priceMax: number;
  language: string;
  level: string;
  isOnline: boolean;
  page: number;
  size: number;
  field: string;
  direction: boolean;
}

const getCoursesByPageAndSize = async (page: number, size: number, field: string, direction: boolean) => {
  const { data } = await axios.get<ICoursesPagingResponse>(`${process.env.NEXT_PUBLIC_HOST}/api/courses`, {
    headers: { Authorization: `${localStorage.getItem('token')}` },
    params: {
      page,
      size,
      field,
      direction
    }
  });
  return data;
};

const getCoursesFiltered = async (request: FilterRequest) => {
  const { title, language, priceMin, priceMax, isOnline, level, page, size, field, direction } = request;

  const { data } = await axios.get<ICoursesPagingResponse>(`${process.env.NEXT_PUBLIC_HOST}/api/courses/filter`, {
    headers: { Authorization: `${localStorage.getItem('token')}` },
    params: {
      title,
      language,
      priceMin,
      priceMax,
      isOnline,
      level,
      page,
      size,
      field,
      direction
    }
  });
  return data;
};

const deleteCourse = async (id?: number) => {
  const { data: deleteResult } = await axios.delete<DeleteResponse>(`${process.env.NEXT_PUBLIC_HOST}/api/courses/${id}`, {
    headers: {
      Authorization: `${localStorage.getItem('token')}`
    }
  });
  return deleteResult;
};

const patchCourse = async (id: number | undefined, field: string, value: string | boolean) => {
  const { data: updateResult } = await axios.patch<UpdateResponse>(
    `${process.env.NEXT_PUBLIC_HOST}/api/courses/${id}`,
    [
      {
        op: 'replace',
        path: `/${field}`,
        value: field === 'price' ? Number(value) : value
      }
    ],
    {
      headers: {
        'Content-Type': 'application/json-patch+json',
        Authorization: `${localStorage.getItem('token')}`
      }
    }
  );
  return updateResult;
};

const getCoursesByStudentId = async (id: number | undefined) => {
  const { data } = await axios.get<ICourse[]>(`${process.env.NEXT_PUBLIC_HOST}/api/courses/students/${id}`, {
    headers: { Authorization: `${localStorage.getItem('token')}` }
  });
  return data;
};

const getPersonalCourses = async (id: number | undefined) => {
  const { data } = await axios.get<ICourse[]>(`${process.env.NEXT_PUBLIC_HOST}/api/courses/students/self/${id}`, {
    headers: { Authorization: `${localStorage.getItem('token')}` }
  });
  return data;
};

export { getCoursesByPageAndSize, getCoursesFiltered, deleteCourse, patchCourse, getCoursesByStudentId, getPersonalCourses };
