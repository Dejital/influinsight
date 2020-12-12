export interface Job {
  id: number;
  uuid: string;
  created: Date;
  status_id: number;
  argument?: string;
  output?: any;
}
