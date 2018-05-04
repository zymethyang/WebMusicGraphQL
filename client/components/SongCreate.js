import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import query from '../queries/fetchSongs';
import { hashHistory } from 'react-router';

class SongCreate extends Component {
    constructor(props) {
        super(props);
        this.state = { title: '' };
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.mutate({
            variables: {
                title: this.state.title
            },
            refetchQueries: [{ query }]
        }).then(() => hashHistory.push('/'));
    }

    render() {
        return (
            <div>
                <h3>Create a New Song</h3>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <label>Song Title:</label>
                    <input onChange={event => this.setState({ title: event.target.value })} value={this.state.title} />
                </form>
            </div>
        );
    }
}

const mutation = gql`
    mutation addSong($title:String){
        addSong(title:$title){
            title
        }
    }
`;

export default graphql(mutation)(SongCreate);