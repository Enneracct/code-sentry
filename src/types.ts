export type Id = string | number;

export type Column = {
  id: Id;
  title: string;
  issues: Issue[];
};

export type Issue = {
  columnId: Id;
  number: number;
  state: string;
  title: string;
  created_at: string;
};
