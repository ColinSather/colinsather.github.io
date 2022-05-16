import Link from 'next/link'

export default function Articles(props){
    return (
        <div className='container'>
            {props.posts.map(post => {
                //extract slug and frontmatter
                const {slug, frontmatter} = post
                //extract frontmatter properties
                const {title, author, category, date, bannerImage, tags} = frontmatter

                //JSX for individual blog listing
                return <article key={title}>
                    <Link href={`/posts/${slug}`}>
                        <h1>{title}</h1>
                    </Link>
                    <h3>{author}</h3>
                    <h3>{date}</h3>
                </article>
            })}
        </div>
    )
}