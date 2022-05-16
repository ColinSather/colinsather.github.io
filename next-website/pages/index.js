import fs from 'fs'
import matter from 'gray-matter'
import Articles from '../components/articles'
import Landing from '../components/landing'
import Animation from '../components/animation'

export default function Home({posts}) {
  return (
    <main>
      <Landing />
      <Animation />
      <Articles posts={posts} />  
    </main>
  ) 
}

//Generating the Static Props for the Blog Page
export async function getStaticProps(){
  // get list of files from the posts folder
  const files = fs.readdirSync('posts')

  // get frontmatter & slug from each post
  const posts = files.map((fileName) => {
      const slug = fileName.replace('.md', '')
      const readFile = fs.readFileSync(`posts/${fileName}`, 'utf-8')
      const { data: frontmatter } = matter(readFile)

      return {
        slug,
        frontmatter,
      }
  })

  // Return the pages static props
  return {
      props: {
        posts,
      },
  }
}