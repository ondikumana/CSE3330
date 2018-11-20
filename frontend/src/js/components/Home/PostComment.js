import React, { Component } from 'react'
import { Segment, Comment } from 'semantic-ui-react'

class PostComment extends Component {

    render() {
        const { comment, names } = this.props

        if (comment && names) {
            return (
                <Comment key={comment.comment_id} >
                    <Comment.Avatar src={`https://ui-avatars.com/api/?name=${names[comment.author_id]}`} />
                    <Comment.Content>
                        <Comment.Author>{names[comment.author_id]}</Comment.Author>
                        <Comment.Text>{comment.body}</Comment.Text>
                        <Comment.Actions>
                            <Comment.Action>Like</Comment.Action>
                        </Comment.Actions>
    
                    </Comment.Content>
    
                </Comment>
            )
        }
        else {
            return (<div></div>)
        }
        
    }
}

export default PostComment