import styles from "./Message.module.css";

function Message() {
  return (
    <span className={styles.messageCS}>
      <span className="material-symbols-rounded">
        fmd_bad
      </span>
    </span>
  );
}

export default Message;
