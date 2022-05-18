import Link from 'next/link'
import Image from 'next/image'

export default function Articles(props){
    return (
        <div className='container'>
            {/*
            <div className='d-flex'>
                <input type="text" placeholder="Search..." className="form-control" />
                <button type="submit" className="search-btn ml2">
                    <i className="fa fa-search"></i>
                </button>
            </div>
            */}
            <br />
            {props.posts.map(post => {
                //extract slug and frontmatter
                const {slug, frontmatter} = post
                //extract frontmatter properties
                const {title, author, date, bannerImage} = frontmatter

                //JSX for individual blog listing
                return (
                    <article key={title}>
                        <Link href={`/posts/${slug}`}>
                            <h1>{title}</h1>
                        </Link>
                        <p>{author} · {date}</p>
                        <br />
                        <Image src={bannerImage} alt={title} width="100%" height="100%" />
                    </article>
                )
            })}
        </div>
    )
}