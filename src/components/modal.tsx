import react, { Component } from 'react';
type CurrentProps = {
  title: string;
  body: string;
  link: string;
};
export const DetailQuestion = (props: CurrentProps) => {
  console.log('props::123', props);
  const closeModal = () => {
    let modalEle = document.getElementById('question');
    if (modalEle && modalEle.classList) {
      modalEle.style.display = 'none';
      modalEle.classList.remove('show');
    }
  };
  return (
    <div
      className="modal fade"
      id="question"
      tabIndex={1}
      aria-labelledby="questionLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="questionLabel">
              {props.title}
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={closeModal}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>
              <div dangerouslySetInnerHTML={{ __html: props.body }}></div>
            </p>
            <hr />
            <h5>Visit to stackoverflow website</h5>
            <p>
              <a
                href={props.link}
                target="_blank"
                className="tooltip-test"
                title="Tooltip"
              >
                {props.link}
              </a>
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
