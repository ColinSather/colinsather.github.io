import Image from "next/image"

let flag = false

const executeSearch = () => {
    if (flag)
        console.log("search function executes here")

    flag = !flag
    let search_bar = document.getElementById("hideSearch")
    let collapse_nav = document.getElementById("navbarCollapse")

    if (flag) {
        search_bar.style.display = "block"
        collapse_nav.style.display = "none"
    } 
    else {
        search_bar.style.display = "none"
        collapse_nav.style.display = "block"
    }
}

function Header() {
    return (
        <nav className="navbar navbar-expand-md scrolling-navbar pb-1">
            <div className="container-fluid">
                <div className="col-md-2">
                    <a href="/" className="navbar-brand">
                        <Image alt="Logo" src="/favicon.ico"
                            width={64} height={64} />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="fa fa-bars"></i>
                    </button>
                </div>
                <div className="col-md-8 text-center">
                    <div id="navbarCollapse">
                        <ul className="navbar-nav w-100 justify-content-center">
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
                    <input type="text" placeholder="Search..." className="form-control" id="hideSearch"/>
                </div>
                <div className="col-md-2">
                    <div className="d-flex justify-content-end">
                        <button type="submit" className="search-btn ml2" onClick={executeSearch}>
                            <i className="fa fa-search"></i>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header