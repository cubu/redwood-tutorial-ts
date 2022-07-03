import { useState } from 'react'

import {
  Form,
  FormError,
  Label,
  TextField,
  TextAreaField,
  Submit,
  SubmitHandler,
  useForm,
} from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY as CommentsQuery } from 'src/components/Comment/CommentsCell'

const CREATE = gql`
  mutation CreateCommentMutation($input: CreateCommentInput!) {
    createComment(input: $input) {
      id
      name
      body
      createdAt
    }
  }
`
interface FormValues {
  name: string
  comment: string
}

interface Props {
  postId: number
}

const CommentForm = ({ postId }: Props) => {
  const formMethods = useForm()
  const [hasPosted, setHasPosted] = useState(false)
  const [createComment, { loading, error }] = useMutation(CREATE, {
    onCompleted: () => {
      setHasPosted(true)
      toast.success('Thank you for your comment!')
      formMethods.reset()
    },
    refetchQueries: [{ query: CommentsQuery, variables: { postId } }],
  })

  const onSubmit: SubmitHandler<FormValues> = (input) => {
    createComment({ variables: { input: { postId, ...input } } })
  }
  return (
    <div className={hasPosted ? 'hidden' : ''}>
      <h3>Leave a Comment</h3>
      <Form
        className="mt-4 w-full"
        onSubmit={onSubmit}
        formMethods={formMethods}
      >
        <FormError error={error} />
        <Label name="name">Name</Label>
        <TextField name="name" validation={{ required: true }} />

        <Label name="body">Comment</Label>
        <TextAreaField name="body" validation={{ required: true }} />

        <Submit disabled={loading}>Submit</Submit>
      </Form>
    </div>
  )
}

export default CommentForm
