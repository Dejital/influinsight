import "../styles/globals.css";
import styles from "../styles/Home.module.css";
import { Layout, Typography } from "antd";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Layout.Header>
        <div className={styles.header}>
          <Typography.Title level={1}>
            <a href={"/"}>Influinsight</a>
            <span>
              <a href={"http://snevsky.com"} target={"_blank"}>
                App by Serge Nevsky
              </a>
            </span>
          </Typography.Title>
        </div>
      </Layout.Header>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
