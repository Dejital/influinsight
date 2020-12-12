import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Button, Form, Input, Layout, PageHeader, Typography } from "antd";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Job } from "../db/job";

export default function Home() {
  const router = useRouter();
  const [profile, setProfile] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFinish = async (values) => {
    if (values.profile) {
      setLoading(true);

      const job = await axios.get<Job>(`/api/instagram-profile-by-likes/${values.profile}`);

      if (job.data.status_id === 0) {
        let tries = 60;
        while (tries > 0) {
          const status = await axios.get<Job>(`/api/jobs/${job.data.uuid}`);

          if (status.data.status_id !== 1) {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            tries--;
          } else {
            tries = 0;
            await router.push({
              pathname: `/job/${job.data.uuid}`,
            });
          }
        }
      }
    }
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Influinsight</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageHeader
        title={"Instagram - Sorted by Likes"}
        subTitle={"Get posts sorted by likes from an Instagram profile."}
      >
        <Layout.Content>
          <Form layout={"vertical"} onFinish={handleFinish}>
            <Form.Item name={"profile"} label={"Profile Name"} tooltip={"Must be a public Instagram profile."}>
              <Input
                name={"profile"}
                placeholder={"Enter a public profile name (for example, sergorgeous)"}
                onChange={(event) => setProfile(event.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Button type={"primary"} htmlType={"submit"} disabled={!profile} loading={loading}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Layout.Content>
      </PageHeader>
    </div>
  );
}
