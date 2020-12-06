import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Button, Form, Input, Layout, PageHeader } from "antd";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [profile, setProfile] = useState("");

  const handleFinish = () => {
    router.push({
      pathname: `/api/instagram-profile-by-likes/${profile}`,
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Influinsight</title>
      </Head>
      <PageHeader
        title={"Instagram - Sorted by Likes"}
        subTitle={"Get posts sorted by likes from an Instagram profile."}
      >
        <Layout.Content>
          <Form layout={"vertical"} onFinish={handleFinish}>
            <Form.Item label={"Profile Name"} tooltip={"Must be a public Instagram profile."}>
              <Input
                placeholder={"Enter a public profile name (for example, sergorgeous)"}
                onChange={(event) => setProfile(event.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Button type={"primary"} htmlType={"submit"} disabled={!profile}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Layout.Content>
      </PageHeader>
    </div>
  );
}
