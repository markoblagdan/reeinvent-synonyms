import styles from "./styles.module.css";

export default function LoadingSpinner({
  size = "default",
}: {
  size?: "default" | "large";
}) {
  return (
    <div
      className={
        styles["lds-ring"] +
        " " +
        (size === "large" ? styles["lds-ring--large"] : "")
      }
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
