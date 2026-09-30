import styles from './PopupBackground.module.css';

interface PopupBackgroundProps {
  onClick: () => void;
}

export default function PopupBackground ({ onClick }:PopupBackgroundProps)  {

  return (
    <div onClick={onClick} className={styles.popupBackground}>
    </div>
  );
}
