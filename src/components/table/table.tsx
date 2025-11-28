import styles from './table.module.css';

type TableProps = {
  children?: React.ReactNode;
};

export const Table = ({ children }: TableProps) => {
  return <table className={styles.table}>{children}</table>;
};

export const TableHeader = ({ children }: TableProps) => {
  return <thead>{children}</thead>;
};

export const TableBody = ({ children }: TableProps) => {
  return <tbody>{children}</tbody>;
};

export const TableRow = ({ children }: TableProps) => {
  return <tr>{children}</tr>;
};

export const TableHead = ({ children }: TableProps) => {
  return <th>{children}</th>;
};

export const TableCell = ({ children }: TableProps) => {
  return <td>{children}</td>;
};
