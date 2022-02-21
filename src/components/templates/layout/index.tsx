import Head from 'next/head';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="bg-[#140532] min-h-screen">
      <Head>
        <title>Meera crud</title>
        <meta name="description" content="Crud Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </div>
  );
};

export default Layout;
