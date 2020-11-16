import Head from 'next/head';
import styled from 'styled-components';
import Button from '@base/Button';

const Main = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>Styled Component</Main>
      <Button label="Base Button" />
    </>
  );
}
