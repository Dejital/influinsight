import styles from "../../styles/Home.module.css";
import Head from "next/head";
import { Layout, PageHeader, Table, Typography } from "antd";
import db from "../../db";
import { Job } from "../../db/job";
import { useRouter } from "next/router";

function ViewJob({ data }) {
  if (!data) return <div></div>;

  const { argument, output } = data;
  const router = useRouter();

  const columns = [
    {
      title: "Post",
      dataIndex: "url",
      key: "url",
      render: (url) => (
        <a href={url} target={"_blank"}>
          {url}
        </a>
      ),
    },
    {
      title: "Likes",
      dataIndex: "likes",
      key: "likes",
      render: (likes) => <span>{likes}</span>,
    },
  ];

  return (
    <div className={styles.container}>
      <Head>
        <title>@{argument} - Influinsight</title>
      </Head>
      <PageHeader title={`@${argument}`} subTitle={"Instagram posts sorted by likes."} onBack={() => router.push("/")}>
        <Layout.Content>
          <Table columns={columns} dataSource={output} />
        </Layout.Content>
      </PageHeader>
    </div>
  );
}

// This gets called on every request
export async function getServerSideProps(context) {
  const { job } = context.params;
  const jobDao = await db
    .select("argument", "output")
    .from<Job>("jobs")
    .where({
      uuid: job,
    })
    .first();

  // Pass data to the page via props
  return { props: { data: jobDao } };
}

export default ViewJob;
