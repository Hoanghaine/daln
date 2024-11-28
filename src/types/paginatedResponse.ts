import { IComment } from './comment';
import { ITag } from './tag'
import { IPost } from './posts'
import { IDoctor, IDoctorsBasicInfor } from './doctor'
import { IUser } from './user'
import { ISchedule } from './schedule';
export interface IPaginatedResponse<T> {
  data: {
    elements: T[] // The elements will be of type T, which can be any type (e.g., IPost, ITag, etc.)
    totalPages: number
    totalElements: number
  }
  message: string | null
}

export type IUsersResponse = IPaginatedResponse<IUser>
export type ITagsResponse = IPaginatedResponse<ITag>
export type IPostsResponse = IPaginatedResponse<IPost>
export type IDoctorsResponse = IPaginatedResponse<IDoctor>
export type IDoctorsBasicInforResponse = IPaginatedResponse<IDoctorsBasicInfor>
export type ICommentsResponse = IPaginatedResponse<IComment>
export type ISchedulesResponse = IPaginatedResponse<ISchedule>