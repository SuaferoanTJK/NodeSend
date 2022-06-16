import Layout from "../../components/Layout";
import axiosClient from "../../config/axios";

export async function getStaticProps() {
  const answer = await axiosClient.get("/api/links/DoPkw62xc");
  console.log(answer);
  return {
    props: {
      link: answer.data,
    },
  };
}

export async function getStaticPaths() {
  const links = await axiosClient.get("/api/links");
  return {
    paths: links.data.links.map((link) => ({
      params: { link: link.url },
    })),
    fallback: false,
  };
}

export default ({ link }) => {
  console.log(link);
  return (
    <Layout>
      <h1>Desde [link].js</h1>
    </Layout>
  );
};
