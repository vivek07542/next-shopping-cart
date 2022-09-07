import Head from 'next/head';
import React from 'react';

const Layout = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title ? title + '- Budget Keeper' : 'Budget Keeper'}</title>
        <meta name="description" content="ECommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-12 justify-between shadow-md items-center px-4 py-1 bg-purple-500 text-lg font-bold text-white">
            <a href="#" className="text-lg font-bold text-white">
              Budget Keeper
            </a>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex justify-center items-center h-10 shadow-inner">
          <p>Copyright @ 2022 Budget Keeper</p>
        </footer>
      </div>
    </>
  );
};

export default Layout;
