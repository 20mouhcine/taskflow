import styles from "./MainContent.module.css";
import Tooltip from "./Tooltip";
interface Column {
  id: string;
  title: string;
  tasks: string[];
}
interface MainContentProps {
  columns: Column[];
}
export default function MainContent({ columns }: MainContentProps) {
  return (
    <main className={styles.main}>
      <div className={styles.board}>
        {columns.map((col) => (
          <div key={col.id} className={styles.column}>
            <h3 className={styles.colTitle}>
              {col.title} ({col.tasks.length})
            </h3>
            {col.tasks.map((task, i) => (
              <div key={i} className={styles.card}>
                {task}
                <Tooltip />
              </div>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}
