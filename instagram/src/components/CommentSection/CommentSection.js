import React from 'react';
import Comment from './Comment';
import PropTypes from "prop-types";
import {Row, Col, Form, Input} from 'reactstrap';
import styled from 'styled-components';
import Span from '../Styles/Styles';

class CommentSection extends React.Component{
    constructor(props){
        super(props);
        this.state={
            comments: props.comments,
            input: '',
            likes: props.likes,
            liked: false
        }
    }
    addNewComment = (e,i) => {
        e.preventDefault();
        let comments = this.state.comments.slice(i);
        comments.push({username: 'FakeAcct', text: this.state.input});
        this.setState({comments, input:''})
    }
    incrementLike = prevState => {
        let likes = this.state.likes;
        likes+=1;
        this.setState({likes, liked:!prevState.liked});
    }
    handleNewComment = e => {
        this.setState({input: e.target.value});
    }
    render(){
        return(
            <Col>
                <Row>
                    <i onClick={this.incrementLike} className="fa fa-heart-o like-comment" aria-hidden="true"></i>
                    <i className="fa fa-comment-o like-comment" aria-hidden="true"></i>
                </Row>
                <Span weight={700}>{this.state.likes} likes</Span>
                <Col>
                    {this.state.comments.map((comment, i) => {
                        return (
                            <Row key={i}>
                                <Comment comment={comment} /> 
                            </Row>
                        )})}
                </Col>
                <Col sm={{offset: -2}}>{this.props.timestamp}</Col>
                <Form onSubmit={this.addNewComment}>
                    <Row>
                        <Col sm='11'><Input onChange={this.handleNewComment}
                            placeholder="Add a comment...">
                        </Input></Col>
                        <Col sm='1'><i className="fa fa-ellipsis-h"></i></Col>
                    </Row>
                </Form>
                
            </Col>
        );  
    }
}

CommentSection.propTypes = {
    comments: PropTypes.arrayOf(
      PropTypes.shape({
          text: PropTypes.string,
          username: PropTypes.string
        })
    )
  };

export default CommentSection;