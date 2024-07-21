import style from "../styles/components/pinned.module.scss";

export const Pinned: React.FunctionComponent<{ items }> = ({ items }) => {
  return (
    <div className={style["pinned"]}>
      {items.map((item) => (
        <a className="unstyled" href={item.url} target="_blank" key={item.url}>
          <div className={style["pinned-card"]}>
            <span className={style["title"]}>{item.title}</span>
            <p className={style["description"]}>{item.description}</p>
            <div className={style["link"]}>→</div>
          </div>
        </a>
      ))}
    </div>
  );
};
