// Just a temporary type. We'll replace this later

const formattedDate = (datetime: ConstructorParameters<typeof Date>[0]) => {
  const parsedDate = new Date(datetime)
  const month = parsedDate.toLocaleString('default', { month: 'long' })
  return `${parsedDate.getDate()} ${month} ${parsedDate.getFullYear()}`
}

interface Props {
  comment: {
    name: string
    createdAt: string
    body: string
  }
}

const Comment = ({ comment }: Props) => {
  return (
    <div>
      <h2>{comment.name}</h2>
      <time dateTime={comment.createdAt}>
        {formattedDate(comment.createdAt)}
      </time>
      <p>{comment.body}</p>
    </div>
  )
}

export default Comment
