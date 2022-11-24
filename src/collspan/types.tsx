export type MenuItem = {
  key: string | number;
  title: string;
  active?: boolean;
  children?: MenuItem[];
  open?: boolean;
  parent?: MenuItem;
};
