export interface IApiPaginateResponse {
  itemsPerPage: number;
  page: number;
  pages: number;
  items: number;
}

export interface IApiResponse {
  message: 'error' | 'success';
  statusCode: number;
  data?: unknown;
}

export interface IApiSuccessResponse extends IApiResponse {
  status: 'success';
  meta?: IApiPaginateResponse;
}

export interface IApiErrorResponse extends IApiResponse {
  error: string;
  meta: null;
}

export interface Document {
  createdAt: string;
  updatedAt: string;
}
