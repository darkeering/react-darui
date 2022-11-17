export type MenuItem = {
  key: string | number;
  title: string;
  active?: boolean;
  children?: MenuItem[];
  level?: number;
  open?: boolean;
  subNum?: number;
  parent?: MenuItem;
  add: () => void;
  setActive: () => void;

};
