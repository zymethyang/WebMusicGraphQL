import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


class LyricList extends Component {
    onLike(id, likes) {
        this.props.mutate({
            variables: { id: id },
            optimisticResponse: {
                __typename: 'Mutation',
                likeLyric: {
                    id: id,
                    __typename: 'LyricType',
                    likes: likes + 1
                }
            }
        })
    }
    renderLyrics() {
        return this.props.lyrics.map(({ id, content, likes }) => {
            return (
                <li key={id} className="collection-item">
                    {content}
                    <i className="material-icons" onClick={() => this.onLike(id, likes)}>thumb_up</i>
                    {likes}
                </li>
            );
        })
    }
    render() {
        return (
            <ul>
                {this.renderLyrics()}
            </ul>
        );
    }
}

const mutation = gql`
    mutation LikeLyric($id:ID){
        likeLyric(id:$id){
            id
            likes
        }
    }
`;

export default graphql(mutation)(LyricList);