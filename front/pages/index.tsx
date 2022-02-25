import type { NextPage } from 'next';
import Layout from '../components/layouts/Layout';
import Font from '../components/commons/Font';

const Home: NextPage = () => {
  return (
    <Layout>
      <Font text={'안녕'} size={'small'} />
    </Layout>
  );
};

export default Home;
