import react, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getQuestions } from '../store/effects';
import { ApplicationState, Question } from '../store/question';
import InfiniteScroll from 'react-infinite-scroll-component';
import { DetailQuestion } from './modal';
type StateProps = {
  questions: Array<Question>;
  hasMore: Boolean;
};
type currentState = {
  questions: Array<Question>;
  detailQuestion: {
    title: string;
    body: string;
    link: string;
  };
  toggleModal: Boolean;
};
type Props = {
  questions: Array<Question>;
  getQuestions: typeof getQuestions;
  hasMore: Boolean;
};

class QuestionList extends Component<Props, currentState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      questions: [],
      toggleModal: false,
      detailQuestion: {
        title: '',
        body: '',
        link: '',
      },
    };
  }
  componentDidMount() {
    this.props.getQuestions(
      'page=1&pagesize=20&order=desc&sort=creation&site=stackoverflow&filter=withbody'
    );
  }
  getMoreQuestions() {
    let skip = 20 * (this.props.questions.length/20 - 1);
    this.props.getQuestions(
      `page=${skip}&pagesize=20&order=desc&sort=creation&site=stackoverflow&filter=withbody`
    );
  }
  handleDetailQuestion(item: Question) {
    this.setState({ detailQuestion: item, toggleModal: true });
    //temp code alternative we can use react-boottrap modal
    let modalEle = document.getElementById('question');
    if (modalEle && modalEle.classList) {
      modalEle.style.display = 'block';
      modalEle.classList.add('show');
    }
  }
  public render() {
    return (
      <InfiniteScroll
        dataLength={(this.props.questions && this.props.questions.length) || 0}
        next={this.getMoreQuestions.bind(this)}
        hasMore={this.props.hasMore ? true : false}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>No more questions available</b>
          </p>
        }
      >
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Author</th>
              <th scope="col">Creation Date</th>
            </tr>
          </thead>
          <tbody>
            {this.props.questions &&
              this.props.questions.map((item, index) => (
                <tr key={index}>
                  <th scope="row">
                    <a
                      href="#"
                      data-toggle="modal"
                      data-target="#question"
                      onClick={this.handleDetailQuestion.bind(this, item)}
                    >
                      {item.title}
                    </a>
                  </th>
                  <td>{item.author}</td>
                  <td>{new Date(item.creationDate).toDateString()}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <DetailQuestion {...this.state.detailQuestion} />
      </InfiniteScroll>
    );
  }
}

const mapStateToProps = (state: ApplicationState): StateProps => {
  return {
    questions: state && state.questions,
    hasMore: state && state.hasMore,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getQuestions,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionList);
