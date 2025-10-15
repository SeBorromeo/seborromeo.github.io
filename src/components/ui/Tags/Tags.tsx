import styles from './Tags.module.scss';

export enum TagTheme {
	Pink = 'pink',
	WhiteOutline = 'whiteOutline',
}

const Tags = ({ list, theme = TagTheme.Pink }: { list: String[], theme?: TagTheme }) => {
	return (
		<div className={`${styles.tags_container} ${styles[theme]}`}>
			{list.map((tag, index) => (
				<span key={index} className={styles.tag}>
					{tag}
				</span>
			))}
		</div>
	);
}

export default Tags;