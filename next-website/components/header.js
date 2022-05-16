function Header() {
    return (
        <nav className="navbar navbar-expand-md scrolling-navbar pb-1">
            <div className="container-fluid">
                <div className="col-md-6">
                    <h1 className="logo">
                        <a href="/" className="navbar-brand">Colin&apos;s Website</a>
                    </h1>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="fa fa-bars"></i>
                    </button>
                </div>
                <div className="col-md-6">
                    <div className="collapse navbar-collapse text-right" id="navbarCollapse">
                        <ul className="navbar-nav mr-auto w-100 justify-content-end clearfix">
                        <li className="nav-item">
                            <a className="nav-link" href="#services"> About </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="files/Sather_Resume_2021.pdf" target="_blank">
                            Resume
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#feature"> Projects </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="https://github.com/colinsather">GitHub</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#contact"> Contact </a>
                        </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header