import { MetaTags } from '@redwoodjs/web'

import ArticlesCell from 'src/components/Article/ArticlesCell'
const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <ArticlesCell />
      <hr></hr>
    </>
  )
}

export default HomePage
