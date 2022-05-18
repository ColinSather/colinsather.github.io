import Head from "next/head"
import Header from "./header"
import Footer from "./footer"
import Modal from "./modal"

function Layout({children}) {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Head>
                <title>Colin&apos;s Website</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
            </Head>
            <Header />
            {children}
            <Modal />
            <Footer />
        </div>
    )
}

export default Layout