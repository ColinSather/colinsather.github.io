import Head from 'next/head'
import Header from "./header"
import Footer from "./footer"

function Layout({children}) {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Head>
                <title>Colin&apos;s Website</title>
            </Head>
            <Header />
            {children}
            <Footer />
        </div>
    )
}

export default Layout