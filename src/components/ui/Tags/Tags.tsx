import styles from './Tags.module.scss';

const Tags = ({ list }: {list: String[]}) => {
  return (
    <div className={styles.tags_container}>
      {list.map((tag, index) => (
        <span key={index} className={styles.tag}>
          {tag}
        </span>
      ))}
    </div>
  );
}

export default Tags;